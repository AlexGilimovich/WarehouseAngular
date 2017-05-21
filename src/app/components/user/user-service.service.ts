import { Injectable } from '@angular/core';
import {User} from "./user";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {Role} from "./role";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpAuthService} from "../login/httpAuth.service";
import {Warehouse} from "../warehouse/warehouse";
import {WarehouseCompany} from "../warehouse-company/warehouse-company";

const LIST_URL:string = "http://localhost:8080/web/web/user";
const GET_URL:string = "http://localhost:8080/web/web/user/";
const GET_ROLES_URL:string = "http://localhost:8080/web/web/user/roles";
const SAVE_URL:string = "http://localhost:8080/web/web/user/save";
const DELETE_URL:string = "http://localhost:8080/web/web/user/delete";

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
            let user = new User();
            user.id = item.id;
            user.lastName = item.lastName;
            user.login = item.login;
            user.password = item.password;
            user.firstName = item.firstName;
            user.patronymic = item.patronymic;
            user.dateOfBirth = item.dateOfBirth;
            user.email = item.email;
            user.city = item.city;
            user.street = item.street;
            user.house = item.house;
            user.apartment = item.apartment;
            user.roles = item.roles;
            if (item.warehouse != null)
              user.warehouse = new Warehouse(item.warehouse.idWarehouse, item.warehouse.name);
            return user;
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
      let user = new User();
      user.id = item.id;
      user.lastName = item.lastName;
      user.login = item.login;
      user.password = item.password;
      user.firstName = item.firstName;
      user.patronymic = item.patronymic;
      user.dateOfBirth = item.dateOfBirth;
      user.email = item.email;
      user.city = item.city;
      user.street = item.street;
      user.house = item.house;
      user.apartment = item.apartment;
      user.roles = item.roles.map(item=> {
        return new Role(item.role);
        //return rolesMap.get(item.role);
      });
      if (item.warehouse !== null)
        user.warehouse = new Warehouse(item.warehouse.idWarehouse, item.warehouse.name,
          new WarehouseCompany(item.warehouse.warehouseCompany.idWarehouseCompany,
            item.warehouse.warehouseCompany.name,
            item.warehouse.warehouseCompany.status
          ));
      return user;

    })
  }

  getRoles():Observable<Role[]> {
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_ROLES_URL, options).map((response:Response) => {
      return response.json().map(
        item => {
          return new Role(item.role)
        }
      )
    })
  }

  save(user:User):Observable<any> {
    let url = SAVE_URL;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    if (user.id != undefined) {
      url = `${SAVE_URL}${"/"}${user.id}`;
      return this.httpAuthService.put(url, JSON.stringify(user), options);
    } else {
      return this.httpAuthService.post(url, JSON.stringify(user), options);
    }
  }

  remove(users:User[]):Observable<any> {
    return Observable.create(observer=> {
        let promise = new Promise((resolve, reject)=> {
            let counter = 0;
            users.forEach(user=> {
              this.removeUser(user).map(res=> {
              }).subscribe(res=> {
                if (++counter == users.length) {
                  resolve();
                }
              },
                error=>{
                  if (++counter == users.length) {
                    resolve();
                  }
                }
              );
            })

          }
        );
        promise.then(res=>observer.next());
      }
    );

  }

  private removeUser(user:User):Observable<any> {
    let url = `${DELETE_URL}${"/"}${user.id}`;
    return this.httpAuthService.delete(url);
  }


}
