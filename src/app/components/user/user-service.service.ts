import { Injectable, Inject } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from "./user";
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Role} from "./role";

export const LIST_URL = "localhost:8080/web/web/user/1?page=1&count=10";
export const GET_URL = "localhost:8080/web/web/user/1";

@Injectable()
export class UserService {

  constructor(private http:Http
              //@Inject(LIST_URL) private listUrl:string,
              //@Inject(GET_URL) private getUrl:string
  ) {
  }

  //list():Observable<User[]> {
  //  return this.http.get(this.listUrl).map((response:Response) => {
  //    return (<any>response.json()).map(item => {
  //      return new User(
  //        item.id,
  //        item.lastName,
  //        item.firstName,
  //        item.patronymic,
  //        item.dateOfBirth,
  //        item.email,
  //        item.city,
  //        item.street,
  //        item.house,
  //        item.apartment,
  //        item.roles,
  //        item.warehouse,
  //        item.login,
  //        item.password
  //      );
  //    });
  //  });
  //}

  //get(id:number):Observable<User> {
  //  const url = `${this.getUrl}${id}.json`;
  //  return this.http.get(url).map((response:Response) => {
  //    const item = response.json();
  //    return new User(
  //      item.id,
  //      item.lastName,
  //      item.firstName,
  //      item.patronymic,
  //      item.dateOfBirth,
  //      item.email,
  //      item.city,
  //      item.street,
  //      item.house,
  //      item.apartment,
  //      item.roles,
  //      item.warehouse,
  //      item.login,
  //      item.password
  //    );
  //  })
  //}

  save(user:User) {

  }


  //list():Observable<Role[]> {
  //  return this.http.get(this.listUrl).map((response:Response) => {
  //    return (<any>response.json()).map(item => {
  //      return new Role(
  //        item.id,
  //        item.name
  //      );
  //    });
  //  });
  //}

}
