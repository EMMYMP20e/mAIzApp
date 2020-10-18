import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CamaraIaPage } from './camara-ia.page';

const routes: Routes = [
  {
    path: '',
    component: CamaraIaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamaraIaPageRoutingModule {}
