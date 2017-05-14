import {Warehouse} from "../../entity/warehouse";
import {Role} from "./role";
export class User {
  constructor(public id?:string,
              public lastName?:string,
              public login?:string,
              public password?:string,
              public firstName?:string,
              public patronymic?:string,
              public dateOfBirth?:string,
              public email?:string,
              public city?:string,
              public street?:string,
              public house?:string,
              public apartment?:string,
              public roles?:Set<Role>,
              public warehouse?:Warehouse) {

  }

  public hasRole(role:Role):boolean{
    return this.roles.has(role);
  }
}
