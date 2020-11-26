import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WebServiceService } from './../services/web-service.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.page.html',
  styleUrls: ['./form-usuario.page.scss'],
})
export class FormUsuarioPage implements OnInit {

  public formAgregarUsuario: any;

  public usuario: any;
  public password: any;
  public nombre: any;
  public telefono: any;
  public direccion: any;

  public telefonoStr:string;


  constructor(private formBuilder: FormBuilder, public servidor: WebServiceService, private loadingCtrl: LoadingController, private menu: MenuController, private router: Router) {
    this.formAgregarUsuario = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
    });

  }

  ngOnInit() {
  }

  async agregarUsuario() {
    const loading = await this.loadingCtrl.create({
      animated: true,
      spinner: 'dots',
      message: 'Accesando Servidor',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present()
    this.telefonoStr=String(this.telefono)
    var datos = {
      "usuarionombre": this.nombre,
      "usuariousername": this.usuario,
      "usuariopassword": this.password,
      "usuariotelefono": this.telefonoStr,
      "usuariodireccion": this.direccion
    }
    this.servidor.enviarDatos(datos, "/usuarios").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert("Usuario Registrado");
      console.log(data)
      this.servidor.setID(data['ID'])
      this.menu.enable(true, 'menu')
      this.router.navigate(['/lista-cultivos']);
    }, (err) => {
      alert("Error al conectarse al servidor");
      console.log(err)
    });
  }

}
