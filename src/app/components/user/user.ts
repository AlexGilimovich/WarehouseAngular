import { Role } from "./role";
import { Warehouse } from "../warehouse/warehouse";
import { WarehouseCompany } from "../warehouse-company/warehouse-company";

export class User {
  public id: number;
  public lastName: string;
  public login: string;
  public password: string;
  public firstName: string;
  public patronymic: string;
  public dateOfBirth: string;
  public email: string;
  public city: string;
  public street: string;
  public house: string;
  public apartment: string;
  public roles: Role[];
  public warehouse: Warehouse;
  public warehouseCompany: WarehouseCompany;
  public presetId: number;

  constructor() {

  }

  static create(user) {
    const newUser = new User;
    newUser.id = user.id;
    newUser.lastName = user.lastName;
    newUser.login = user.login;
    newUser.password = user.password;
    newUser.firstName = user.firstName;
    newUser.patronymic = user.patronymic
    newUser.dateOfBirth = user.dateOfBirth;
    newUser.email = user.email;
    newUser.city = user.city;
    newUser.street = user.street;
    newUser.house = user.house;
    newUser.apartment = user.apartment;
    newUser.roles = user.roles;
    newUser.warehouse = user.warehouse;
    newUser.warehouseCompany = user.warehouseCompany;
    newUser.presetId = user.presetId;
    return newUser;
  }

  // public hasRole(role:Role):boolean {
  //   for (let r of this.roles)
  //     if (r.role === role.role) return true;
  //   return false;
  //   //return this.roles.includes(role);
  // }

  public hasRole(role: string): boolean {
    for (let r of this.roles) {
      if (r.role === role) {
        return true;
      }
    }
    return false;
  }

  public addRole(role: Role) {
    if (!this.hasRole(role.role)) {
      this.roles.push(role);
    }
  }

  public removeRole(role: Role) {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].role === role.role) {
        this.roles.splice(i, 1);
      }
    }
  }


}
