import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./Shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path:'login',
    loadChildren:()=> import('./Modules/Auth/auth.module').then(m=> m.AuthModule)
  },
  {
    path:'users',
    loadChildren:()=> import('./Modules/Home/home.module').then(m=> m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path:'users/:id',
    loadChildren:()=> import('./Modules/Home-detail/home-detail.module').then(m=> m.HomeDetailModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
