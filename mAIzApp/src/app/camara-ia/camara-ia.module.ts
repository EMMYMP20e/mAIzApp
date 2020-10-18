import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraIaPageRoutingModule } from './camara-ia-routing.module';

import { CamaraIaPage } from './camara-ia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamaraIaPageRoutingModule
  ],
  declarations: [CamaraIaPage]
})
export class CamaraIaPageModule {}
