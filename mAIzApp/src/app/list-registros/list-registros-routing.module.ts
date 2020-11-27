import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRegistrosPage } from './list-registros.page';

const routes: Routes = [
  {
    path: '',
    component: ListRegistrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRegistrosPageRoutingModule {}
