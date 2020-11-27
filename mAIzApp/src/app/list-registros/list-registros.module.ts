import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRegistrosPageRoutingModule } from './list-registros-routing.module';

import { ListRegistrosPage } from './list-registros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRegistrosPageRoutingModule
  ],
  declarations: [ListRegistrosPage]
})
export class ListRegistrosPageModule {}
