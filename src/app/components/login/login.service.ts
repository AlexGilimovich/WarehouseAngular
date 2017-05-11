import { Injectable } from '@angular/core';
import {User} from "../user/user";
import {HttpAuthService} from "./httpAuth.service";
import {Http, Headers, RequestOptions, RequestMethod, Request} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL:string = "localhost:8080/web/web/user/";

@Injectable()
export class LoginService {
  private authenticatedUser:User = new User("1", "Иванов", "root", "root");//todo delete mocking user

  constructor(private http:Http) {
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
      return new User(
        str.id,
        str.lastName,
        str.firstName,
        str.patronymic,
        str.dateOfBirth,
        str.email,
        str.city,
        str.street,
        str.house,
        str.apartment,
        str.roles,
        str.warehouse,
        str.login,
        str.password
      )
    }).subscribe(user=> {
      this.authenticatedUser = user;
    });

  }

}
