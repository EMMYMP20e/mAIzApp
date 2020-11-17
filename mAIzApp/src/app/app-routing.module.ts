import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'lista-cultivos',
    loadChildren: () => import('./lista-cultivos/lista-cultivos.module').then( m => m.ListaCultivosPageModule)
  },
  {
    path: 'form-cultivo',
    loadChildren: () => import('./form-cultivo/form-cultivo.module').then( m => m.FormCultivoPageModule)
  },
  {
    path: 'camara-ia',
    loadChildren: () => import('./camara-ia/camara-ia.module').then( m => m.CamaraIaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'form-registro',
    loadChildren: () => import('./form-registro/form-registro.module').then( m => m.FormRegistroPageModule)
  },
  {
    path: 'graficas',
    loadChildren: () => import('./graficas/graficas.module').then( m => m.GraficasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
