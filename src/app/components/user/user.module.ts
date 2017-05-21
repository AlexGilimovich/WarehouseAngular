import { NgModule,  } from '@angular/core';
import {FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { CommonModule, DatePipe  } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserContainerComponent } from './user-container/user-container.component';
import {Role} from "./role";
import {UserService} from "./user-service.service";
import { UserListContainerComponent } from './user-list-container/user-list-container.component';
import {WarehouseModule} from "../warehouse/warehouse.module";
import {User} from "./user";

//export const roles:Role[] = [
//  new Role("ROLE_ADMIN", "Администратор системы"),
//  new Role("ROLE_SUPERVISOR", "Администратор склада"),
//  new Role("ROLE_DISPATCHER", "Диспетчер склада"),
//  new Role("ROLE_MANAGER", "Менеджер по складу"),
//  new Role("ROLE_CONTROLLER", "Контролёр"),
//  new Role("ROLE_OWNER", "Владелец склада")
//]
//
//export const rolesMap:Map<string, Role> = new Map([
//  ["ROLE_ADMIN", roles[0]],
//  ["ROLE_SUPERVISOR", roles[1]],
//  ["ROLE_DISPATCHER", roles[2]],
//  ["ROLE_MANAGER", roles[3]],
//  ["ROLE_CONTROLLER", roles[4]],
//  ["ROLE_OWNER", roles[5]]
//]);

export const rolesMessages:Map<string, string> = new Map([
  ["ROLE_ADMIN", "Администратор системы"],
  ["ROLE_SUPERVISOR", "Администратор склада"],
  ["ROLE_DISPATCHER", "Диспетчер склада"],
  ["ROLE_MANAGER", "Менеджер по складу"],
  ["ROLE_CONTROLLER", "Контролёр"],
  ["ROLE_OWNER", "Владелец склада"]
]);


export const userRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'list',
    "pathMatch": 'full'
  }, {
    "path": "details/:id",
    "component": UserDetailsComponent
  }, {
    "path": "list",
    "component": UserListContainerComponent
  }, {
    "path": "create",
    "component": UserDetailsComponent
  }
];


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [UserDetailsComponent, UserListComponent, UserContainerComponent, UserListContainerComponent],
  providers: [UserService, DatePipe]
})
export class UserModule {
}
