import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WebServiceService } from './../services/web-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-cultivo',
  templateUrl: './form-cultivo.page.html',
  styleUrls: ['./form-cultivo.page.scss'],
})
export class FormCultivoPage implements OnInit {
  public formAgregarCultivo: any;

  public nombre: any;
  public ubicacion: any;
  public fecha_inicio: any;

  public fecha: any;

  constructor(private formBuilder: FormBuilder, public servidor: WebServiceService, private loadingCtrl: LoadingController, private menu: MenuController, private router: Router) {
    this.formAgregarCultivo = this.formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
    });

    var desface = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - desface)).toISOString().slice(0, -1);
    //----------------------------
    this.fecha = localISOTime;
    this.fecha_inicio = this.fecha;

  }

  ngOnInit() {
  }

  async guardarCultivo() {
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
      "nombre": this.nombre,
      "fecha_creacion": this.fecha_inicio,
      "id_usuario": this.servidor.getID() ,
      "ubicacion": this.ubicacion,
    }
    this.servidor.enviarDatos(datos, "/").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert("Cultivo Registrado");
      console.log(data)
      this.router.navigate(['/lista-cultivos']);
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }

}
