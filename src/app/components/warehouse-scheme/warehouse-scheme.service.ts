/**
 * Created by Lenovo on 14.05.2017.
 */

import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpAuthService } from '../login/httpAuth.service';
import { Observable } from 'rxjs/Observable';
import { StorageSpace } from './storage-space';
import { Host } from "../../util/host";
import { StorageSpaceType } from "./storage-space-type";
import { isUndefined } from "util";
import { StorageSpaceDTO } from "./storage-space-DTO";
import { StorageCellDTO } from "./storage-cell-DTO";
import { StorageCell } from "./storage-cell";
import { Subject } from "rxjs/Subject";
import { Goods } from '../goods/goods';

@Injectable()
export class WarehouseSchemeService {
  public cellSource = new Subject<StorageCell[]>();
  public cartItems$ = this.cellSource.asObservable();

  private selectedGoodsSource = new Subject<Goods>();
  public selectedGoods$ = this.selectedGoodsSource.asObservable();

  public deleteGoodsListSource = new Subject<Goods>();
  public deleteGoodsListSource$ = this.deleteGoodsListSource.asObservable();

  constructor(private http: Http, private httpAuthService: HttpAuthService,
              private location: Location) {
  }

  checkout(cell: StorageCell[]) {
    this.cellSource.next(cell);
    // this.location.back();
  }

  public goodsWereSelected(goods: Goods): void {
    this.selectedGoodsSource.next(goods);
  }

  getStorageSpace(id: number): Observable<StorageSpace[]> {
    const url = Host.URL + 'storage/' + id;
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
        storageSpace.status = item.status;
        return storageSpace;
      });
    });
  }

  getCellById(id: number): Observable<StorageCell[]> {
    const url = Host.URL + 'storage/getCellById/' + id;
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
        storageCell.status = item.status;
        storageCell.goods = item.goods;
        return storageCell;
      });
    });
  }

  getAllSpaceType(): Observable<StorageSpaceType[]> {
    const url = Host.URL + 'storage/getAllTypeOfSpace';
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
        return storageSpaceType;
      });
    });
  }

  saveSpace(space: StorageSpaceDTO) {
    if (isUndefined(space.idStorageSpace)) {
      space.status = true; //default is active after creating
    }
    const url = isUndefined(space.idStorageSpace) ? Host.URL + "storage/save" : Host.URL + "storage/save/" + space.idStorageSpace;
    const body = JSON.stringify(space);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });

    if (isUndefined(space.idStorageSpace)) {
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

  saveCell(cell: StorageCellDTO) {
    if (cell.idStorageCell == 0) {
      cell.status = true; //default is active after creating
    }
    const url = cell.idStorageCell == 0 ? Host.URL + "storage/cell/save" : Host.URL + "storage/cell/save/" + cell.idStorageCell;
    const body = JSON.stringify(cell);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });

    if (cell.idStorageCell == 0) {
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

  deleteSpace(id: number) {
    const url = Host.URL + "storage/delete/" + id;

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

  deleteCell(id: string) {
    const url = Host.URL + "storage/cell/delete/" + id;

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
