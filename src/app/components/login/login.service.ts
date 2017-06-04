import {Injectable} from "@angular/core";
import {User} from "../user/user";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Warehouse} from "../warehouse/warehouse";
import {WarehouseCompany} from "../warehouse-company/warehouse-company";
import {Observable} from "rxjs";
import {Role} from "../user/role";
import {SessionStorage, SessionStorageService, LocalStorageService} from "ng2-webstorage";

const URL:string = "http://localhost:8080/web/web/login";

@Injectable()
export class LoginService {

  @SessionStorage()
  private authenticatedUser:User;

  constructor(private http:Http,
              private localStorageService:LocalStorageService,
              private sessionStorageService:SessionStorageService) {
    let user = <User>sessionStorageService.retrieve("authenticatedUser");
    if (user) {
      this.authenticatedUser = User.create(user);
    }

    this.authenticatedUser = new User();
    this.authenticatedUser.login = "root";
    this.authenticatedUser.password = "root";
    this.authenticatedUser.warehouse = new Warehouse(1, "name", true, 1, 1, new WarehouseCompany(10));

  }

  public getLoggedUser():User {
    return this.authenticatedUser;
  }


  public checkLocalStorage():User {
    if (this.localStorageService.retrieve("user")) {
      this.authenticatedUser = <User>this.localStorageService.retrieve("user");
      return this.authenticatedUser;
    }
  }


  public login(login:string, password:string, rememberMe:boolean):Observable<Role[]> {
    let headers:Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(login + ":" + password));
    let requestOptions:RequestOptions = new RequestOptions({headers: headers});
    return this.http.get(URL, requestOptions).map(
      res=> {

        let str = res.json();
        let user = new User();
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
        user.roles = str.roles.map(item=> {
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
          this.localStorageService.store("user", user);
        }
        return user.roles;
      }
    )
  }

  public logout(user:User):Observable<boolean> {
    return Observable.create(
      observer=> {
        this.localStorageService.clear("user");
        return observer.next(true);
      }
    )
  }

}
