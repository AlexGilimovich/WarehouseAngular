import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Warehouse } from '../warehouse/warehouse';
import { WarehouseCompany } from '../warehouse-company/warehouse-company';
import { Observable } from 'rxjs';
import { Role } from '../user/role';
import { SessionStorage, SessionStorageService, LocalStorageService } from 'ng2-webstorage';
import { Host } from '../../util/host';

const BASE_URL = Host.getURL();
const HEADER_AUTHORIZATION = 'Authorization';

@Injectable()
export class LoginService {

  @SessionStorage()
  private authenticatedUser: User;

  constructor(private http: Http,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService) {
    const user = <User>sessionStorageService.retrieve('authenticatedUser');
    if (user) {
      this.authenticatedUser = User.create(user);
    }
  }

  public getLoggedUser(): User {
    return this.authenticatedUser;
  }


  public checkLocalStorage(): User {
    if (this.localStorageService.retrieve('user')) {
      this.authenticatedUser = <User>this.localStorageService.retrieve('user');
      return this.authenticatedUser;
    }
  }

  private getAuthorizationHeaderValue(login: string, password: string): string {
    return `${'Basic '} ${btoa(`${login}${':'}${password}`)}`;
  }

  public login(login: string, password: string, rememberMe: boolean): Observable<Role[]> {
    const headers: Headers = new Headers();
    headers.append(HEADER_AUTHORIZATION, this.getAuthorizationHeaderValue(login, password));
    const requestOptions: RequestOptions = new RequestOptions({headers: headers});
    return this.http.get(`${BASE_URL}${'login'}`, requestOptions).map(
      res => {
        const str: any = res.json();
        const user = new User();
        user.id = str.id;
        user.lastName = str.lastName;
        user.login = login;
        user.password = password;
        user.firstName = str.firstName;
        user.patronymic = str.patronymic;
        user.dateOfBirth = str.dateOfBirth;
        user.email = str.email;
        user.city = str.city;
        user.street = str.street;
        user.house = str.house;
        user.apartment = str.apartment;
        user.presetId = str.presetId;
        user.roles = str.roles.map(item => {
          return new Role(item.role);
        });
        if (str.warehouse !== null)
          user.warehouse = new Warehouse(str.warehouse.idWarehouse, str.warehouse.name,
            str.warehouse.status,
            str.warehouse.x,
            str.warehouse.y,
            new WarehouseCompany(str.warehouse.warehouseCompany.idWarehouseCompany,
              str.warehouse.warehouseCompany.name,
              str.warehouse.warehouseCompany.status
            ));
        if (str.warehouseCompany !== null) {
          user.warehouseCompany = new WarehouseCompany(str.warehouseCompany.idWarehouseCompany,
            str.warehouseCompany.name,
            str.warehouseCompany.status
          );
        }
        this.authenticatedUser = user;
        if (rememberMe) {
          this.localStorageService.store('user', user);
        }
        return user.roles;
      }
    );
  }

  public logout(user: User): Observable<boolean> {
    return Observable.create(
      observer => {
        this.localStorageService.clear('user');
        return observer.next(true);
      }
    );
  }

}
