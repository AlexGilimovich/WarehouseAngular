import {Role} from "./role";
import {Warehouse} from "../warehouse/warehouse";

export class User {
  public id:number;
  public lastName:string;
  public login:string;
  public password:string;
  public firstName:string;
  public patronymic:string;
  public dateOfBirth:string;
  public email:string;
  public city:string;
  public street:string;
  public house:string;
  public apartment:string;
  public roles:Role[];
  public warehouse:Warehouse;
  constructor() {

  }

  public hasRole(role:Role):boolean {
    for (let r of this.roles)
      if (r.role === role.role) return true;
    return false;
    //return this.roles.includes(role);
  }

  public addRole(role:Role) {
    if (!this.hasRole(role))
      this.roles.push(role);
  }

  public removeRole(role:Role) {
    for (let i = 0; i < this.roles.length; i++)
      if (this.roles[i].role === role.role)
        this.roles.splice(i, 1);
  }


}
