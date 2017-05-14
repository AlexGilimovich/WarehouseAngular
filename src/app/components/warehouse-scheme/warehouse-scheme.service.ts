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
        return storageSpace;
      });
    });
  }
}
