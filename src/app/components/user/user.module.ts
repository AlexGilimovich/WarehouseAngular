import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserContainerComponent } from './user-container/user-container.component';
import {Role} from "./role";
import { UserCreateComponent } from './user-create/user-create.component';
import {UserService} from "./user-service.service";
import { UserListContainerComponent } from './user-list-container/user-list-container.component';

export const roles:Role[] = [
  new Role("ROLE_ADMIN", "Администратор системы"),
  new Role("ROLE_SUPERVISOR", "Администратор склада"),
  new Role("ROLE_DISPATCHER", "Диспетчер склада"),
  new Role("ROLE_MANAGER", "Менеджер по складу"),
  new Role("ROLE_CONTROLLER", "Контролёр"),
  new Role("ROLE_OWNER", "Владелец склада")
]

export const rolesMap:Map<string, Role> = new Map([
  ["ROLE_ADMIN", roles[0]],
  ["ROLE_SUPERVISOR", roles[1]],
  ["ROLE_DISPATCHER", roles[2]],
  ["ROLE_MANAGER", roles[3]],
  ["ROLE_CONTROLLER", roles[4]],
  ["ROLE_OWNER", roles[5]]
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
    "component": UserCreateComponent
  }
];


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule

  ],
  declarations: [UserDetailsComponent, UserListComponent, UserContainerComponent, UserCreateComponent, UserListContainerComponent],
  providers: [UserService]
})
export class UserModule {
}
