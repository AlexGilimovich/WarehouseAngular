import {Injectable} from '@angular/core';
import {HttpAuthService} from "../login/httpAuth.service";
import {Observable} from "rxjs/Observable";
import {WarehouseCustomerCompany} from "./customer";
import {Headers, RequestOptions, Response} from "@angular/http";
import {Host} from "../../util/host";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

const path = Host.getURL() + 'customer';

@Injectable()
export class WarehouseCustomerCompanyService {

  constructor(private httpAuthService: HttpAuthService) {
  }

  getAll(page?: number, count?: number): Observable<WarehouseCustomerCompany[]> {
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
        return this.mapCustomerFromItem(item);
      });
    });
  }

  getById(id: number): Observable<WarehouseCustomerCompany> {
    if (id != null) {
      const url = path + '/' + id;
      const headers = new Headers();
      const options = new RequestOptions({
        headers: headers,
      });

      return this.httpAuthService.get(url, options).map((response: Response) => {
        const item = response.json();
        return this.mapCustomerFromItem(item);
      });
    }
  }

  save(customer: WarehouseCustomerCompany) {
    const url = path + '/';
    const body = JSON.stringify(customer);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    return this.httpAuthService.post(url, body, options).map((response: Response) => {
      if (response.text()) {
        return (response.json());
      }
    });
  }

  update(customer: WarehouseCustomerCompany) {
    const url = path + '/' + customer.id;
    const body = JSON.stringify(customer);
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

  search(searchParams: string) {
    const customer = new WarehouseCustomerCompany();
    customer.name = searchParams;

    const url = path + '/search';
    const body = JSON.stringify(customer);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });

    return this.httpAuthService.post(url, body, options).map((response: Response) => {
      return (response.json()).map(item => {
        return this.mapCustomerFromItem(item);
      });
    });
  }

  removeCustomerFromArray(customers: WarehouseCustomerCompany[], customer: WarehouseCustomerCompany) {
    const index = customers.indexOf(customer, 0);
    if (index > -1) {
      customers.splice(index, 1);
    }
    return customers;
  }

  mapCustomerFromForm(form: FormGroup, id?: number): WarehouseCustomerCompany {
    const customer = new WarehouseCustomerCompany();
    if (id != null) {
      customer.id = id;
    }
    customer.name = form.controls['name'].value;
    return customer;
  }

  parseIdParam(route: ActivatedRoute) {
    let id;
    route.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  private mapCustomerFromItem(item: any) {
    const customer = new WarehouseCustomerCompany();
    customer.id = item.id;
    customer.name = item.name;
    return customer;
  }
}
