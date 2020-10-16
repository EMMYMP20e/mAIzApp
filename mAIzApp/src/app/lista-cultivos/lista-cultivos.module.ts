import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCultivosPageRoutingModule } from './lista-cultivos-routing.module';

import { ListaCultivosPage } from './lista-cultivos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCultivosPageRoutingModule
  ],
  declarations: [ListaCultivosPage]
})
export class ListaCultivosPageModule {}
