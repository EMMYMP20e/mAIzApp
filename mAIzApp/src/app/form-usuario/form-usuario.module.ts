import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormUsuarioPageRoutingModule } from './form-usuario-routing.module';

import { FormUsuarioPage } from './form-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormUsuarioPageRoutingModule
  ],
  declarations: [FormUsuarioPage]
})
export class FormUsuarioPageModule {}
