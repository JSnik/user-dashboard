import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDetailComponent } from './components/home-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../Shared/shared.module";
const routes: Routes = [
  { path: '', component: HomeDetailComponent },
]


@NgModule({
  declarations: [
    HomeDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeDetailModule { }
