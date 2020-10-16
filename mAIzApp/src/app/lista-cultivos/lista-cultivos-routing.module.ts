import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCultivosPage } from './lista-cultivos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCultivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCultivosPageRoutingModule {}
