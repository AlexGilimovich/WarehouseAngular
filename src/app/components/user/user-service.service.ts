import { Injectable, Inject } from '@angular/core';
import {User} from "./user";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable, Subscription} from 'rxjs';
import {Role} from "./role";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpAuthService} from "../login/httpAuth.service";
import {RequestOptionsArgs} from "../../../../node_modules/@angular/http/src/interfaces";

import {rolesMap} from "./user.module";
import {Warehouse} from "../warehouse/warehouse";

const LIST_URL:string = "http://localhost:8080/web/web/user";
const GET_URL:string = "http://localhost:8080/web/web/user/";
const SAVE_URL:string = "http://localhost:8080/web/web/user/save";

@Injectable()
export class UserService {
  constructor(private http:Http,
              private httpAuthService:HttpAuthService) {
  }

  list(page:number, count:number):Observable<any> {
    const url:string = `${LIST_URL}${"?page="}${page}${"&count="}${count}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response)=> {
      let count:string = response.headers.get("x-total-count");
      return {
        users: (<any>response.json()).map(item=> {
            return new User(
              item.id,
              item.lastName,
              item.login,
              item.password,
              item.firstName,
              item.patronymic,
              item.dateOfBirth,
              item.email,
              item.city,
              item.street,
              item.house,
              item.apartment,
              item.roles,
              item.warehouse.idWarehouse
            );
          }
        ),
        count: count
      }
    })
  }

  get(id:number):Observable<User> {
    const url = `${GET_URL}${id}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response) => {
      const item = response.json();
      return new User(
        item.id,
        item.lastName,
        item.login,
        item.password,
        item.firstName,
        item.patronymic,
        item.dateOfBirth,
        item.email,
        item.city,
        item.street,
        item.house,
        item.apartment,
        new Set<Role>(item.roles.map(item=> {
          return rolesMap.get(item.role);
        })),
        new Warehouse(item.warehouse.idWarehouse)
      );
    })
  }

  save(user:User) {
    let url = SAVE_URL;
    if (user.id != undefined)
      url = `${SAVE_URL}${user.id}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    this.httpAuthService.post(url, user.toString(), options).subscribe(resp=>console.debug(resp));
  }


}
