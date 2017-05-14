/**
 * Created by Lenovo on 13.05.2017.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpAuthService} from '../login/httpAuth.service';
import {Observable} from 'rxjs/Observable';
import {Warehouse} from './warehouse';
import {Host} from "../../util/host";

@Injectable()
export class WarehouseService {

  constructor(private http: Http, private httpAuthService: HttpAuthService) {}

  getWarehouse(id: number): Observable<Warehouse[]> {
    const url = Host.URL+'warehouse/'+id;
    const headers = new Headers();
    const params = new URLSearchParams();

    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return (response.json()).map(item => {
        const warehouse: Warehouse = new Warehouse();
        warehouse.idWarehouse = item.idWarehouse;
        warehouse.name = item.name;
        warehouse.warehouseCompany = item.warehouseCompany;
        return warehouse;
      });
    });
  }


}
