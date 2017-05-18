import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpAuthService} from '../login/httpAuth.service';
import {Observable} from 'rxjs/Observable';
import {TransportCompany} from './tr-company';
import {Host} from "../../util/host";
import {FormGroup} from "@angular/forms";

const path = Host.getURL() + 'tr-company';

@Injectable()
export class TransportCompanyService {

  constructor(private http: Http, private httpAuthService: HttpAuthService) {}

  getAll(page?: number, count?: number): Observable<TransportCompany[]> {
    const url = path + '/';
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

  save(company: TransportCompany) {
    const url = path + '/';
    const body = JSON.stringify(company);
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

  delete(id: number) {
    if (id != null) {
      const url = path + '/' + id.toString();
      const headers = new Headers();
      headers.set('Content-Type', 'application/json;charset=utf-8');
      const options = new RequestOptions({
        headers: headers
      });

      return this.httpAuthService.delete(url, options).map((response: Response) => {
        if (response.text()) {
          return (response.json());
        }
      });
    }
  }

  mapCustomerFromForm(form: FormGroup): TransportCompany {
    const company = new TransportCompany();
    company.name = form.controls['name'].value;
    company.isTrusted = form.controls['isTrusted'].value;
    return company;
  }

  removeCompanyFromArray(companies: TransportCompany[], company: TransportCompany) {
    const index = companies.indexOf(company, 0);
    if (index > -1) {
      companies.splice(index, 1);
    }
    return companies;
  }

}
