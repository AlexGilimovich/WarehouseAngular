import {Injectable} from '@angular/core';
import {User} from "../user/user";
import {HttpAuthService} from "./httpAuth.service";
import {Http, Headers, RequestOptions, RequestMethod, Request} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Warehouse} from "../warehouse/warehouse";
import {WarehouseCompany} from "../warehouse-company/warehouse-company";
import {Observable, Subject} from "rxjs";

const URL:string = "localhost:8080/web/web/user/";

@Injectable()
export class LoginService {
  //todo delete mocking user


  constructor(private http:Http,
              private authenticatedUser:User) {
    this.authenticatedUser.id = 10;
    this.authenticatedUser.login = "root";
    this.authenticatedUser.password = "root";
    this.authenticatedUser.lastName = "Гилимович";
    this.authenticatedUser.firstName = "Александр";
    this.authenticatedUser.patronymic = "Сергеевич";
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

  public logout(user:User):Observable<boolean> {
    return Observable.create(
      observer=> {
        //todo logout
        let logout = true;
        if (logout)
          return observer.next(true);
         else return observer.error();
      }
    )


  }

}
