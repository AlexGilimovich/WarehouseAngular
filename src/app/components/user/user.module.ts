import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserContainerComponent } from './user-container/user-container.component';
import {Role} from "./role";
import { UserCreateComponent } from './user-create/user-create.component';
import {UserService} from "./user-service.service";
import {HttpService} from "../../http.service";

export const roles:Role[] = [
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
  }  , {
    "path": "create",
    "component": UserCreateComponent
  }
];


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  declarations: [UserDetailsComponent, UserListComponent, UserContainerComponent, UserCreateComponent],
  providers:[UserService]
})
export class UserModule {
}
