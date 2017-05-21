/**
 * Created by Lenovo on 13.05.2017.
 */

import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpAuthService} from '../login/httpAuth.service';
import {Observable} from 'rxjs/Observable';
import {WarehouseCompany} from './warehouse-company';
import {Host} from "../../util/host";
import {isUndefined} from "util";

@Injectable()
export class WarehouseCompanyService {

  constructor(private http: Http, private httpAuthService: HttpAuthService) {}

  getCompany(): Observable<WarehouseCompany[]> {
    const url = Host.URL+'company/';
    const headers = new Headers();
    const params = new URLSearchParams();

    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return (response.json()).map(item => {
        const company: WarehouseCompany = new WarehouseCompany();
        company.idWarehouseCompany = item.idWarehouseCompany;
        company.name = item.name;
        company.status = item.status;
        return company;
      });
    });
  }

  save(company: WarehouseCompany) {
    if(isUndefined(company.idWarehouseCompany)){
      console.log("is save action");
    }
    const url = isUndefined(company.idWarehouseCompany) ?  Host.URL + "company/save" : Host.URL + "company/save/"+company.idWarehouseCompany;
    console.log("URL: "+url);
    const body = JSON.stringify(company);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    if(isUndefined(company.idWarehouseCompany)) {
      return this.httpAuthService.post(url, body, options).map((response: Response) => {
        if (response.text()) {
          return (response.json());
        }
      });
    }
    else {
      return this.httpAuthService.put(url, body, options).map((response: Response) => {
        if (response.text()) {
          return (response.json());
        }
      });
    }
  }

  delete(id: string){
    const url = Host.URL + "company/delete/"+id;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });

    console.log(url);
    return this.httpAuthService.delete(url, options).map((response: Response) => {
      if (response.text()){
        return (response.json());
      }
    });
  }

  getCompanyById(id: number){
    const url = Host.URL+'company/'+id;
    console.log(url);
    const headers = new Headers();
    const params = new URLSearchParams();

    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return (response.json()).map(item => {
        const company: WarehouseCompany = new WarehouseCompany();
        company.idWarehouseCompany = item.idWarehouseCompany;
        company.name = item.name;
        company.status = item.status;
        return company;
      });
    });
  }

}
