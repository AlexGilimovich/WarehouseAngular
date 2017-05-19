import { Injectable } from '@angular/core';
import {HttpAuthService} from "../login/httpAuth.service";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable, Subscription} from 'rxjs';
import {Act} from "./act";
import {User} from "../user/user";
import {ActType} from "./actType";

const LIST_URL:string = "http://localhost:8080/web/web/act";
const GET_URL:string = "http://localhost:8080/web/web/act/";
const SAVE_URL:string = "http://localhost:8080/web/web/act/save";
const GET_ACTS_FOR_GOODS_URL:string ="http://localhost:8080/web/web/act/acts";

@Injectable()
export class ActService {

  constructor(private httpAuthService:HttpAuthService) {
  }

  list(page:number, count:number):Observable<any> {
    const url:string = `${LIST_URL}${"?page="}${page}${"&count="}${count}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response)=> {
      let count:string = response.headers.get("x-total-count");
      return {
        users: (<any>response.json()).map(item=> {
            return new Act(
              item.id,
              item.date,
              item.user,
              item.goods,
              item.actType
            );
          }
        ),
        count: count
      }
    });
  }



  get(id:number):Observable<Act> {
    const url = `${GET_URL}${id}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response) => {
      const item = response.json();
      return new Act(
        item.id,
        item.date,
        item.user,
        item.goods,
        item.actType
      )
    })
  }

  save(act:Act) {

  }

  public getActsForGoods(goodsId):Observable<Act[]> {
    const url:string = `${GET_ACTS_FOR_GOODS_URL}${"/"}${goodsId}`;
    return this.httpAuthService.get(url).map((response:Response) => {
      return response.json().map(
        item => {
          let act = new Act();
          act.id = item.id;
          act.date = item.date;
          let user = new User();
          user.id = item.id;
          user.lastName = item.lastName;
          user.firstName = item.firstName;
          user.patronymic = item.patronymic;
          act.user = user;
          act.actType = new ActType(item.actType.id, item.actType.name)
          return act;
        }
      )
    })
  }

}
