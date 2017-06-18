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
        return this.parse(item);
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

    return this.httpAuthService.post(url, body, options).map((response: Response) => {
      return (response.json()).map(item => {
        return this.parse(item);
      });
    });
  }

  save(warehouse: Warehouse) {
    if(isUndefined(warehouse.idWarehouse)){
      warehouse.status = true; //warehouse is active after registration
    }
    const url = isUndefined(warehouse.idWarehouse) ?  Host.URL + "warehouse/save" : Host.URL + "warehouse/save/"+warehouse.idWarehouse;
    const body = JSON.stringify(warehouse);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });

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
        return this.parse(item);
      });
    });
  }

  delete(id: number){
    const url = Host.URL + "warehouse/delete/"+id;

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

  private parse(item: any){
    const warehouse: Warehouse = new Warehouse();
    warehouse.idWarehouse = item.idWarehouse;
    warehouse.name = item.name;
    warehouse.x = item.x;
    warehouse.y = item.y;
    warehouse.status = item.status;
    warehouse.warehouseCompany = item.warehouseCompany;
    return warehouse;
  }
}
