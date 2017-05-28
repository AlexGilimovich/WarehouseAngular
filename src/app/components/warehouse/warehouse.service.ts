/**
 * Created by Lenovo on 13.05.2017.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpAuthService} from '../login/httpAuth.service';
import {Observable} from 'rxjs/Observable';
import {Warehouse} from './warehouse';
import {Host} from "../../util/host";
import {isUndefined} from "util";
import {WarehouseCompany} from "../warehouse-company/warehouse-company";

@Injectable()
export class WarehouseService {

  constructor(private http: Http, private httpAuthService: HttpAuthService) {}

  getWarehouse(id: number, page: number, count: number): Observable<Warehouse[]> {
    const url = Host.URL+'warehouse/?id='+id+'&page='+page+'&count='+count;
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

  search(warehouse: Warehouse): Observable<Warehouse[]>{
    const url = Host.URL+'warehouse/search';

    const body = JSON.stringify(warehouse);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    return this.httpAuthService.post(url, body, options).map((response: Response) => {
      return (response.json()).map(item => {
        const warehouse: Warehouse = new Warehouse();
        warehouse.idWarehouse = item.idWarehouse;
        warehouse.name = item.name;
        warehouse.warehouseCompany = item.warehouseCompany;
        console.log(warehouse);
        return warehouse;
      });
    });
  }

  save(warehouse: Warehouse) {
    if(isUndefined(warehouse.idWarehouse)){
      console.log("is save action");
    }
    const url = isUndefined(warehouse.idWarehouse) ?  Host.URL + "warehouse/save" : Host.URL + "warehouse/save/"+warehouse.idWarehouse;
    console.log("URL: "+url);
    const body = JSON.stringify(warehouse);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    if(isUndefined(warehouse.idWarehouse)) {
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

  getWarehouseById(id: number){
    const url = Host.URL+'warehouse/getWarehouseById/'+id;
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

  delete(id: number){

    const url = Host.URL + "warehouse/delete/"+id;
    console.log("URL: "+url);

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
