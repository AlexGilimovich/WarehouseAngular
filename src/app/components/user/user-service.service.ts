import { Injectable, Inject } from '@angular/core';
import {User} from "./user";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable, Subscription} from 'rxjs';
import {Role} from "./role";
//import {LoginService} from "../login/login.service";
//import {Md5} from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpAuthService} from "../login/httpAuth.service";
import {RequestOptionsArgs} from "../../../../node_modules/@angular/http/src/interfaces";


const LIST_URL:string = "http://localhost:8080/web/web/user";
const GET_URL:string = "http://localhost:8080/web/web/user/";

@Injectable()
export class UserService {
  constructor(private http:Http,
              private httpAuthService:HttpAuthService) {
  }

  list(page:number, count:number):Observable<User[]> {
    const url:string = `${LIST_URL}${"?page="}${page}${"&count="}${count}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url,options).map((response:Response)=> {
        return (<any>response.json()).map(item=> {
            return new User(
              item.id,
              item.lastName,
              item.firstName,
              item.patronymic,
              item.dateOfBirth,
              item.email,
              item.city,
              item.street,
              item.house,
              item.apartment,
              item.roles,
              item.warehouse,
              item.login,
              item.password
            );
          }
        )
      })



  }

  get(id:number):Observable<User> {
    const url = `${GET_URL}${id}`;
    let username:string = 'root';
    let password:string = 'root';
    let headers:Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/x-www-form-urlencoded");


    return this.http.get(url, headers).map((response:Response) => {
      const item = response.json();
      return new User(
        item.id,
        item.lastName,
        item.firstName,
        item.patronymic,
        item.dateOfBirth,
        item.email,
        item.city,
        item.street,
        item.house,
        item.apartment,
        item.roles,
        item.warehouse,
        item.login,
        item.password
      );
    })
  }

  save(user:User) {

  }


  //list2(page:number, count:number):Observable<User[]> {
  //  let username:string = 'root';
  //  //let username:string = this.loginService.getAuthenticatedUser().login;
  //  let password:string = 'root';
  //  //let password:string = this.loginService.getAuthenticatedUser().password;
  //
  //  const url:string = `${LIST_URL}${page}${"&count="}${count}`;
  //
  //  let users:Observable<User[]> = this.http.get(url).map((response:Response)=> {
  //      (<any>response.json()).map(item=> {
  //          return new User(
  //            item.id,
  //            item.lastName,
  //            item.firstName,
  //            item.patronymic,
  //            item.dateOfBirth,
  //            item.email,
  //            item.city,
  //            item.street,
  //            item.house,
  //            item.apartment,
  //            item.roles,
  //            item.warehouse,
  //            item.login,
  //            item.password
  //          );
  //        }
  //      )
  //    })
  //    .catch(error=> {
  //      if (error.status == 401) {
  //        let auth:string = error.headers.get("www-authenticate");
  //        let realmRegexp:RegExp = new RegExp(/realm="([\w\s]+)"/);
  //        let nonceRegexp:RegExp = new RegExp(/nonce="([\w\s=]+)"/);
  //        let realm:string = realmRegexp.exec(auth)[1];
  //        let nonce:string = nonceRegexp.exec(auth)[1];
  //        //HA1=MD5(username:realm:password)
  //        //HA2=MD5(method:digestURI)
  //        //response=MD5(HA1:nonce:HA2)
  //        let ha1 = Md5.hashStr(`${username}:${realm}:${password}`);
  //        let ha2 = Md5.hashStr(`GET:/web/web/user?page=1&count=10`);
  //        let response = Md5.hashStr(`${ha1}:${nonce}:${ha2}`);
  //        let headers:Headers = new Headers();
  //        headers.append("Authorization",
  //          `Digest username="${password}", realm="${realm}", nonce="${nonce}", uri="/web/web/user?page=1&count=10", response="${response}", opaque=""`);
  //        let options = new RequestOptions({headers: headers});
  //
  //        let observableUser:Observable<void> = this.http.get(url, options).map(response=> {
  //            (<any>response.json()).map(item=> {
  //                return new User(
  //                  item.id,
  //                  item.lastName,
  //                  item.firstName,
  //                  item.patronymic,
  //                  item.dateOfBirth,
  //                  item.email,
  //                  item.city,
  //                  item.street,
  //                  item.house,
  //                  item.apartment,
  //                  item.roles,
  //                  item.warehouse,
  //                  item.login,
  //                  item.password
  //                );
  //              }
  //            )
  //          })
  //          .catch(error=> {
  //            console.log(error);
  //            return Observable.throw("Mess");
  //          })
  //        observableUser.subscribe((users:void)=> {
  //          console.log(users);
  //        });
  //      }
  //      return Observable.throw("Mess");
  //    });
  //  return users;
  //
  //}

}
