/**
 * Created by Lenovo on 13.05.2017.
 */

import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpAuthService} from '../login/httpAuth.service';
import {Observable} from 'rxjs/Observable';
import {WarehouseCompany} from './warehouse-company';
import {Host} from "../../util/host";

@Injectable()
export class WarehouseCompanyService {

  constructor(private http: Http, private httpAuthService: HttpAuthService) {}

  getCompany(): Observable<WarehouseCompany[]> {
    const url = Host.URL+'customer/';
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

/*  save(customer: WarehouseCompany) {
    const url = 'http://localhost:8080/web/tr-company/';
    const body = JSON.stringify(customer);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    return this.httpAuthService.post(url, body, options).map((response: Response) => {
      if (response.text()){
        return (response.json());
      }
    });
  }*/

}
