import {Injectable} from "@angular/core";
import {User} from "../user/user";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Warehouse} from "../warehouse/warehouse";
import {WarehouseCompany} from "../warehouse-company/warehouse-company";
import {Observable} from "rxjs";
import {Role} from "../user/role";
import {LocalStorageService} from "angular-2-local-storage";

const URL:string = "http://localhost:8080/web/web/login";

@Injectable()
export class LoginService {
  private authenticatedUser:User;

  constructor(private http:Http,
              private localStorageService:LocalStorageService) {
    this.authenticatedUser = new User();
    this.authenticatedUser.login = "root";
    this.authenticatedUser.password = "root";
    this.authenticatedUser.warehouse = new Warehouse(1, "name", new WarehouseCompany(10));

  }

  public getLoggedUser():User {
    return this.authenticatedUser;
  }


  public checkLocalStorage():User {
    if (this.localStorageService.get("user")) {
      this.authenticatedUser = <User>this.localStorageService.get("user");
      return this.authenticatedUser;
    }
  }



  public login(login:string, password:string, rememberMe:boolean):Observable<Role> {
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
            new WarehouseCompany(str.warehouse.warehouseCompany.idWarehouseCompany,
              str.warehouse.warehouseCompany.name,
              str.warehouse.warehouseCompany.status
            ));
        this.authenticatedUser = user;
        if (rememberMe) {
          this.localStorageService.add("user", user);
        }
        return user.roles[0];//todo
      }
    )
  }

  public logout(user:User):Observable<boolean> {
    return Observable.create(
      observer=> {
        this.localStorageService.remove("user");
        return observer.next(true);
      }
    )


  }

}
