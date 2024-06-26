import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeService} from "./services/home.service";
import {MatTableModule} from "@angular/material/table";
const routes: Routes = [
  { path: '', component: HomeComponent },
]


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
