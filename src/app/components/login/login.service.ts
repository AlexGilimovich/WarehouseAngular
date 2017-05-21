import { Injectable } from '@angular/core';
import {User} from "../user/user";
import {HttpAuthService} from "./httpAuth.service";
import {Http, Headers, RequestOptions, RequestMethod, Request} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Warehouse} from "../warehouse/warehouse";
import {WarehouseCompany} from "../warehouse-company/warehouse-company";

const URL:string = "localhost:8080/web/web/user/";

@Injectable()
export class LoginService {
 //todo delete mocking user


  constructor(private http:Http,
              private authenticatedUser: User) {
    this.authenticatedUser.login = "root";
    this.authenticatedUser.password = "root";
    this.authenticatedUser.warehouse = new Warehouse(1, "name", new WarehouseCompany(10));

  }

  public getLoggedUser() {
    return this.authenticatedUser;
  }

  private login(login:string, password:string) {
    let headers:Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(login + ":" + password));
    let requestOptions:RequestOptions = new RequestOptions(headers);
    this.http.get(URL, requestOptions).map(res=> {
      let str = res.json();
      let user = new User();
      user.id = str.id;
      user.id = str.lastName;
      user.id = str.firstName;
      user.id = str.patronymic;
      user.id = str.dateOfBirth;
      user.id = str.email;
      user.id = str.city;
      user.id = str.street;
      user.id = str.house;
      user.id = str.apartment;
      user.id = str.roles;
      user.id = str.warehouse;
      user.id = str.login;
      user.id = str.password;
      return user;
    }).subscribe(user=> {
      this.authenticatedUser = user;
    });

  }

}
