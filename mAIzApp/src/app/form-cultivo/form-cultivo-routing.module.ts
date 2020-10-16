import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCultivoPage } from './form-cultivo.page';

const routes: Routes = [
  {
    path: '',
    component: FormCultivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCultivoPageRoutingModule {}
