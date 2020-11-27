import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WebServiceService } from './../services/web-service.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formularioLogin: FormGroup;

  public recordar: boolean;

  constructor(private formBuilder: FormBuilder, private menu: MenuController, private router: Router, public servidor: WebServiceService, private loadingCtrl: LoadingController,) {
    this.formularioLogin = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.recordar = false;
    this.menu.enable(false, 'menu');

  }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.menu.enable(false, 'menu');
    this.formularioLogin.value.usuario="";
    this.formularioLogin.value.password="";
    this.recordar = false;
  }

  async login() {
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
      "UsuarioUsername": this.formularioLogin.value.usuario,
      "UsuarioPassword": this.formularioLogin.value.password,
    }
    this.servidor.enviarDatos(datos, "/login").pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      console.log("id")
      console.log(data)
      this.servidor.setID(data)
      this.menu.enable(true, 'menu')
      this.router.navigate(['/lista-cultivos']);
    }, (err) => {
      alert("Fallo" + err);
      console.log(err)
    });
    
  }
  /*login() {
    this.servidor.setID(0);
    this.menu.enable(true, 'menu')
    this.router.navigate(['/lista-cultivos']);
  }*/

  goToRegistrar() {
    this.router.navigate(['/form-usuario']);
  }

}
