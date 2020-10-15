import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formularioLogin: FormGroup;

  public recordar: boolean;

  constructor(private formBuilder: FormBuilder, private menu: MenuController) {
    this.formularioLogin = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.recordar=false;
    this.menu.enable(false, 'menu')

  }

  ngOnInit() {
  }

  login() { }

}
