import {Warehouse} from "../../entity/warehouse";
export class User {
  constructor(public id:string,
              public lastName:string,
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
              public roles?:Set<string>,
              public warehouse?:Warehouse) {

  }
}
