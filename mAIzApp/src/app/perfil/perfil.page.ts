import { Component, OnInit } from '@angular/core';
import { WebServiceService } from './../services/web-service.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { delay } from 'q';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public usuario: any;

  constructor(public servidor: WebServiceService, private loadingCtrl: LoadingController) {
    this.usuario = {
      "user_nombre":"",
      "usuario":"",
      "user_direccion":"",
      "user_telefono":"",
    }
   }

  ngOnInit() { }

  async ionViewWillEnter() {
    const loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'dots',
      message: 'Accesando Servidor',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present()

    var datos = {
      "IDUser": this.servidor.getID()
    }
    this.servidor.enviarDatos(datos, "/obtenerUsuario").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      console.log(data)
      console.log(data['0']);
      console.log(data['0'].user_nombre);
      this.usuario = {
        "usuarionombre":data['0'].usuarionombre,
        "usuariousername":data['0'].usuariousername,
        "usuariodireccion":data['0'].usuariodireccion,
        "usuariotelefono":data['0'].usuariotelefono
      };
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }

}
