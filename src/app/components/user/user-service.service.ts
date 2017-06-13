import { Injectable } from '@angular/core';
import { User } from './user';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Role } from './role';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAuthService } from '../login/httpAuth.service';
import { Warehouse } from '../warehouse/warehouse';
import { WarehouseCompany } from '../warehouse-company/warehouse-company';

const LIST_URL: string = "http://localhost:8080/web/web/user";
const UPDATE_PRESET_URL: string = "http://localhost:8080/web/web/user/preset";
const WAREHOUSE_LIST_URL: string = 'http://localhost:8080/web/web/user/warehouse';
const GET_URL: string = "http://localhost:8080/web/web/user/";
const GET_ROLES_URL: string = "http://localhost:8080/web/web/user/roles";
const SAVE_URL: string = "http://localhost:8080/web/web/user/save";
const DELETE_URL: string = "http://localhost:8080/web/web/user/delete";
const CHECK_LOGIN_URL: string = "http://localhost:8080/web/web/user/is_occupied?loginName=";
const HEADER_X_TOTAL_COUNT = "x-total-count";


@Injectable()
export class UserService {
  constructor(private httpAuthService: HttpAuthService) {
  }

  list(page?: number, count?: number): Observable<any> {
    let url: string;
    if (page && count) {
      url = `${LIST_URL}${'?page='}${page}${'&count='}${count}`;
    } else {
      url = LIST_URL;
    }
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response: Response) => {
      const count: string = response.headers.get(HEADER_X_TOTAL_COUNT);
      return {
        users: (<any>response.json()).map(item => {
            return this.mapResponseItemToUser(item);
          }
        ),
        count: count
      };
    });
  }

  warehouseList(warehouseId: number, page?: number, count?: number): Observable<any> {
    let url: string;
    if (page && count) {
      url = `${WAREHOUSE_LIST_URL}${'/'}${warehouseId}${'?page='}${page}${'&count='}${count}`;
    } else {
      url = `${WAREHOUSE_LIST_URL}${'/'}${warehouseId}`;
    }
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response: Response) => {
      const count: string = response.headers.get(HEADER_X_TOTAL_COUNT);
      return {
        users: (<any>response.json()).map(item => {
            return this.mapResponseItemToUser(item);
          }
        ),
        count: count
      }
    })
  }

  get(id: number): Observable<User> {
    const url = `${GET_URL}${id}`;
    let headers: Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response: Response) => {
      return this.mapResponseItemToUser(response.json());
    })
  }

  getRoles(): Observable<Role[]> {
    let headers: Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_ROLES_URL, options).map((response: Response) => {
      return response.json().map(
        item => {
          return new Role(item.role)
        }
      )
    })
  }

  save(user: User): Observable<any> {
    let url = SAVE_URL;
    let headers: Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    if (user.id != undefined) {
      url = `${SAVE_URL}${"/"}${user.id}`;
      return this.httpAuthService.put(url, JSON.stringify(user), options);
    } else {
      return this.httpAuthService.post(url, JSON.stringify(user), options);
    }
  }

  remove(users: User[]): Observable<any> {
    return Observable.create(observer=> {
        let counter = users.length;
        users.forEach(user=> {
            this.removeUser(user).subscribe(res=> {
                if (--counter == 0) {
                  observer.next();
                  observer.complete();
                }
              },
              error=> {
                if (--counter == 0) {
                  observer.next();
                  observer.complete();
                }
              }
            );
          }
        );
      }
    );

  }

  private removeUser(user: User): Observable<any> {
    let url = `${DELETE_URL}${"/"}${user.id}`;
    return this.httpAuthService.delete(url);
  }

  public checkLoginNameExists(loginName: string): Observable<string> {
    return this.httpAuthService.get(`${CHECK_LOGIN_URL}${loginName}`).map(
      (resp) => {
        return resp.json().status;
      }
    );
  }

  public savePreset(userId: number, presetId: number): Observable<Response> {
    const url = `${UPDATE_PRESET_URL}${'?id='}${userId}${'&preset='}${presetId}`;
    return this.httpAuthService.put(url);
  }


  private mapResponseItemToUser(item: any): User {
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
        item.warehouse.status,
        item.warehouse.x,
        item.warehouse.y,
        new WarehouseCompany(item.warehouse.warehouseCompany.idWarehouseCompany,
          item.warehouse.warehouseCompany.name,
          item.warehouse.warehouseCompany.status
        ));
    return user;
  }
}


