import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserContainerComponent} from "./user-container/user-container.component";
import {UserService} from "./user-service.service";
import {UserListContainerComponent} from "./user-list-container/user-list-container.component";
import {SpinnerModule} from "angular2-spinner/dist/";



export const rolesMessages:Map<string, string> = new Map([
  ["ROLE_ADMIN", "Администратор системы"],
  ["ROLE_SUPERVISOR", "Администратор склада"],
  ["ROLE_DISPATCHER", "Диспетчер склада"],
  ["ROLE_MANAGER", "Менеджер по складу"],
  ["ROLE_CONTROLLER", "Контролёр"],
  ["ROLE_OWNER", "Владелец компании"]
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
    ReactiveFormsModule,
    SpinnerModule

  ],
  declarations: [UserDetailsComponent, UserListComponent, UserContainerComponent, UserListContainerComponent],
  providers: [UserService, DatePipe]
})
export class UserModule {
}
