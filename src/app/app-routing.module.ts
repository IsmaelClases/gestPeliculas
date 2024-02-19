import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/pages/error404/error404.component';
import { canMatchGuard } from './shared/guards/auth.guard';
import { canSeeMatchGuard } from './shared/guards/permises.guard';
import { areLogedMatchGuard } from './shared/guards/loged.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [areLogedMatchGuard],
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./cartelera/cartelera.module').then((m) => m.CarteleraModule),
    canActivate: [canMatchGuard],
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
    canActivate: [canMatchGuard, canSeeMatchGuard],
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
