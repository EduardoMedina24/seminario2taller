import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'jugar/:id',
    loadChildren: () => import('./pages/jugar/jugar.module').then( m => m.JugarPageModule)
  },
  {
    path: 'nevel',
    loadChildren: () => import('./pages/nevel/nevel.module').then( m => m.NevelPageModule)
  },
  {
    path: 'record',
    loadChildren: () => import('./pages/record/record.module').then( m => m.RecordPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
