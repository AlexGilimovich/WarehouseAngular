/**
 * Created by Lenovo on 14.05.2017.
 */
/**
 * Created by Lenovo on 13.05.2017.
 */

import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {HttpAuthService} from '../login/httpAuth.service';
import {Observable} from 'rxjs/Observable';
import {StorageSpace} from './storage-space';
import {Host} from "../../util/host";
import {StorageSpaceType} from "./storage-space-type";
import {isUndefined} from "util";
import {StorageSpaceDTO} from "./storage-space-DTO";
import {StorageCellDTO} from "./storage-cell-DTO";
import {StorageCell} from "./storage-cell";

@Injectable()
export class WarehouseSchemeService {

  constructor(private http: Http, private httpAuthService: HttpAuthService) {}

  getStorageSpace(id: number): Observable<StorageSpace[]> {
    const url = Host.URL+'storage/'+id;
    const headers = new Headers();
    const params = new URLSearchParams();

    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return (response.json()).map(item => {
        const storageSpace: StorageSpace = new StorageSpace();
        storageSpace.idStorageSpace = item.idStorageSpace;
        storageSpace.storageCellList = item.storageCellList;
        storageSpace.storageSpaceType = item.storageSpaceType;
        console.log("goods"+storageSpace.storageCellList)
        return storageSpace;
      });
    });
  }

  getCellById(id: number): Observable<StorageCell[]> {
    const url = Host.URL+'storage/getCellById/'+id;
    const headers = new Headers();
    const params = new URLSearchParams();

    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return (response.json()).map(item => {
        const storageCell: StorageCell = new StorageCell();
        storageCell.number = item.number;
        storageCell.idStorageCell = item.idStorageCell;
        storageCell.goods = item.goods;
        console.log("httpAuthService: "+storageCell);
        return storageCell;
      });
    });
  }

  getAllSpaceType(): Observable<StorageSpaceType[]> {
    const url = Host.URL+'storage/getAllTypeOfSpace';
    const headers = new Headers();
    const params = new URLSearchParams();

    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return (response.json()).map(item => {
        const storageSpaceType: StorageSpaceType = new StorageSpaceType();
        storageSpaceType.idStorageSpaceType = item.idStorageSpaceType;
        storageSpaceType.name = item.name;
        console.log(storageSpaceType);
        return storageSpaceType;
      });
    });
  }

  saveSpace(space: StorageSpaceDTO) {
    if(isUndefined(space.idStorageSpace)){
      console.log("is save action");
    }
    const url = isUndefined(space.idStorageSpace) ?  Host.URL + "storage/save" : Host.URL + "storage/save/"+space.idStorageSpace;
    console.log("URL: "+url);
    const body = JSON.stringify(space);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    console.log(headers);
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    if(isUndefined(space.idStorageSpace)) {
      return this.httpAuthService.post(url, body, options).map((response: Response) => {
        if (response.text()) {
          console.log(response.json());
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

  saveCell(cell: StorageCellDTO){
    if(isUndefined(cell.idStorageCell)){
      console.log("is save action");
    }
    const url = isUndefined(cell.idStorageCell) ?  Host.URL + "storage/cell/save" : Host.URL + "storage/cell/save/"+cell.idStorageCell;
    console.log("URL: "+url);
    const body = JSON.stringify(cell);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    console.log(headers);
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    if(isUndefined(cell.idStorageCell)) {
      return this.httpAuthService.post(url, body, options).map((response: Response) => {
        if (response.text()) {
          console.log(response.json());
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
}
