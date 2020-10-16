import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCultivoPageRoutingModule } from './form-cultivo-routing.module';

import { FormCultivoPage } from './form-cultivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormCultivoPageRoutingModule
  ],
  declarations: [FormCultivoPage]
})
export class FormCultivoPageModule {}
