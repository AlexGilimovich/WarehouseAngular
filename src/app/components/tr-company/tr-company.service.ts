import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpAuthService} from '../login/httpAuth.service';
import {Observable} from 'rxjs/Observable';
import {TransportCompany} from './tr-company';
import {Host} from "../../util/host";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

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
        return this.mapCompanyFromItem(item);
      });
    });
  }

  getById(id: number): Observable<TransportCompany> {
    if (id != null) {
      const url = path + '/' + id;
      const headers = new Headers();
      const options = new RequestOptions({
        headers: headers,
      });

      return this.httpAuthService.get(url, options).map((response: Response) => {
        const item = response.json();
        return this.mapCompanyFromItem(item);
      });
    }
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

  update(company: TransportCompany) {
    const url = path + '/' + company.id;
    const body = JSON.stringify(company);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    return this.httpAuthService.put(url, body, options).map((response: Response) => {
      if (response.text()) {
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

  removeCompanyFromArray(companies: TransportCompany[], company: TransportCompany) {
    const index = companies.indexOf(company, 0);
    if (index > -1) {
      companies.splice(index, 1);
    }
    return companies;
  }

  mapCompanyFromForm(form: FormGroup, id?: number): TransportCompany {
    const company = new TransportCompany();
    if (id != null) {
      company.id = id;
    }
    company.isTrusted = form.controls['isTrusted'].value;
    company.name = form.controls['name'].value;
    return company;
  }

  parseIdParam(route: ActivatedRoute) {
    let id;
    route.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  private mapCompanyFromItem(item: any) {
    const company = new TransportCompany();
    company.id = item.id;
    company.isTrusted = item.trusted;
    company.name = item.name;
    return company;
  }
}
