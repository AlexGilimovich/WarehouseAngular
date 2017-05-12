import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpAuthService} from '../login/httpAuth.service';
import {Observable} from 'rxjs/Observable';
import {TransportCompany} from './tr-company';
import {noUndefined} from "@angular/compiler/src/util";

@Injectable()
export class TransportCompanyService {

  constructor(private http: Http, private httpAuthService: HttpAuthService) {}

  getAll(page?: number, count?: number): Observable<TransportCompany[]> {
    const url = 'http://localhost:8080/web/tr-company/';
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
        const company: TransportCompany = new TransportCompany();
        company.id = item.id;
        company.name = item.name;
        company.isTrusted = item.trusted;
        // todo warehousecompanyId
        return company;
      });
    });
  }

}
