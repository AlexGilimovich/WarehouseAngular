import { Injectable } from '@angular/core';
import {HttpAuthService} from "../login/httpAuth.service";
import {Observable} from "rxjs/Observable";
import {WarehouseCustomerCompany} from "./customer";
import {Headers, RequestOptions, Response} from "@angular/http";

@Injectable()
export class WarehouseCustomerCompanyService {

  constructor(private httpAuthService: HttpAuthService) { }

  getAll(page?: number, count?: number): Observable<WarehouseCustomerCompany[]> {
    const url = 'http://localhost:8080/web/customer/';
    const headers = new Headers();
    const params = new URLSearchParams();
    if (page != null) {
      params.set('page', page.toString());
    }
    if (count != null) {
      params.set('count', count.toString());
    }
    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return (response.json()).map(item => {
        const customer = new WarehouseCustomerCompany();
        customer.id = item.id;
        customer.name = item.name;
        return customer;
      });
    });
  }

  save(customer: WarehouseCustomerCompany) {
    const url = 'http://localhost:8080/web/customer/';
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
  }

}
