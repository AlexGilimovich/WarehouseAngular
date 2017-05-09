import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserContainerComponent } from './user-container/user-container.component';
import {Role} from "./role";

export const roles:Role[]=[
  new Role("1", "Администратор системы"),
  new Role("2", "Администратор склада"),
  new Role("3", "Диспетчер склада"),
  new Role("4", "Менеджер по складу"),
  new Role("5", "Контролёр"),
  new Role("6", "Владелец склада")
]

export const userRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'list',
    "pathMatch": 'full'
  }, {
    "path": "details",
    "component": UserDetailsComponent
  }, {
    "path": "list",
    "component": UserListComponent
  }
];


@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [UserDetailsComponent, UserListComponent, UserContainerComponent]
})
export class UserModule {
}
