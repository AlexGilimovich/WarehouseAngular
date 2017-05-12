import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import {UserModule, userRoutes} from "../user/user.module";
import {UserContainerComponent} from "../user/user-container/user-container.component";
import {DispatcherComponent} from "./dispatcher.component";
import {AppModule} from "../../app.module";

export const dispatcherRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'users',
    "pathMatch": 'full'
  }, {
    "path": "users",
    "component": UserContainerComponent,
    "children": userRoutes
  }
];

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    RouterModule
  ],
  declarations: [DispatcherComponent]
})


export class DispatcherModule { }
