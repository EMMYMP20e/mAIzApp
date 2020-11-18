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


  constructor(private formBuilder: FormBuilder, private servidor: WebServiceService, private loadingCtrl: LoadingController, private menu: MenuController, private router: Router) {
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

    var datos = {
      "usuario": this.usuario,
      "password": this.password,
      "nombre": this.nombre,
      "telefono": this.telefono,
      "direccion": this.direccion
    }
    this.servidor.enviarDatos(datos, "/").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      alert("Usuario Registrado");
      console.log(data)
      this.menu.enable(true, 'menu')
      this.router.navigate(['/lista-cultivos']);
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
  }

}
