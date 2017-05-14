import { Injectable } from '@angular/core';
import {HttpAuthService} from "../login/httpAuth.service";
import {Observable, Subscription} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Goods} from "./goods";


const LIST_URL:string = "http://localhost:8080/web/web/goods";
const GET_URL:string = "http://localhost:8080/web/web/goods/";
const SAVE_URL:string = "http://localhost:8080/web/web/goods/save";

@Injectable()
export class GoodsService {

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
          return new Goods(
            item.id,
            item.name,
            item.quantity,
            item.weight,
            item.price,
            item.storageType,
            item.quantityUnit,
            item.weightUnit,
            item.priceUnit,
            item.storageSpace,
            item.storageCell
          );
        }),
        count: count
      }
    });

  }


  get(id:number):Observable<Goods> {
    const url = `${GET_URL}${id}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response) => {
      const item = response.json();
      return new Goods(
        item.id,
        item.name,
        item.quantity,
        item.weight,
        item.price,
        item.storageType,
        item.quantityUnit,
        item.weightUnit,
        item.priceUnit,
        item.storageSpace,
        item.storageCell
      );
    })
  }

  save(goods:Goods) {

  }

}
