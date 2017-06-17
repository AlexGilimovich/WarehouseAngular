import { Injectable } from '@angular/core';
import { HttpAuthService } from '../login/httpAuth.service';
import { Observable, Subject } from 'rxjs';
import { Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Goods } from './goods';
import { GoodsStatusName } from './goodsStatusName';
import { Unit } from './unit';
import { StorageSpaceType } from '../warehouse-scheme/storage-space-type';
import { StorageType } from './storageType';
import { StorageCell } from '../warehouse-scheme/storage-cell';
import { GoodsStatus } from './goodsStatus';
import { GoodsSearchDTO } from './goodsSearchDTO';
import { User } from '../user/user';
import { Host } from '../../util/host';


const BASE_URL = Host.getURL();
const PUT_IN_STORAGE_URL = `${BASE_URL}${'goods'}`;

const LIST_URL = `${BASE_URL}${'goods'}`;
const GET_URL = `${BASE_URL}${'goods/'}`;
const SAVE_URL = `${BASE_URL}${'goods/save'}`;
const GET_STATUS_NAMES_URL = `${BASE_URL}${'goods/statuses'}`;
const GET_QUANTITY_UNITS_URL = `${BASE_URL}${'goods/quant_units'}`;
const GET_PRICE_UNITS_URL = `${BASE_URL}${'goods/price_units'}`;
const GET_WEIGHT_UNITS_URL = `${BASE_URL}${'goods/weight_units'}`;
const GET_STORAGE_SPACE_TYPES_URL = `${BASE_URL}${'goods/storageTypes'}`;
const UPDATE_STATUS_URL = `${BASE_URL}${'goods/status/'}`;
const SEARCH_URL = `${BASE_URL}${'goods/search'}`;
const GET_STATUSES_URL = `${BASE_URL}${'goods/status'}`;
const REMOVE_FROM_STORAGE_URL = `${BASE_URL}${'goods/remove/'}`;


const HEADER_X_TOTAL_COUNT = 'x-total-count';

@Injectable()
export class GoodsService {
  private goodsSource = new Subject<Goods>();
  goodsCreated$ = this.goodsSource.asObservable();

  private goodsForOutgoingInvoiceSource = new Subject<Goods>();
  goodsForOutgoingInvoice$ = this.goodsForOutgoingInvoiceSource.asObservable();

  public selectedForPuttingGoodsSource = new Subject<any>();
  public selectedForPuttingGoods$ = this.selectedForPuttingGoodsSource.asObservable();


  constructor(private httpAuthService: HttpAuthService) {
  }

  //Event emitted when user finished creating goods
  public goodsCreatedEvent(goods: Goods) {
    this.goodsSource.next(goods);
  }

  goodsChosenEvent(goods: Goods) {
    this.goodsForOutgoingInvoiceSource.next(goods);
  }

  list(id: string, page?: number, count?: number): Observable<any> {
    let url: string
    if (!page && !count) {
      url = `${LIST_URL}${'/'}${id}${'/list'}`;
    } else {
      url = `${LIST_URL}${'/'}${id}${'/list'}${'?page='}${page}${'&count='}${count}`;
    }
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response: Response)=> {
      const count: string = response.headers.get(HEADER_X_TOTAL_COUNT);
      return {
        goods: (<any>response.json()).map(
          (item: any) => {
            return this.mapResponseItemToGoods(item);
          }),
        count: count
      };
    });
  }

  companyList(id: string, page?: number, count?: number): Observable<any> {
    let url: string
    if (!page && !count) {
      url = `${LIST_URL}${'/company/'}${id}${'/list'}`;
    } else {
      url = `${LIST_URL}${'/'}${id}${'/list'}${'?page='}${page}${'&count='}${count}`;
    }
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response: Response)=> {
      const count: string = response.headers.get(HEADER_X_TOTAL_COUNT);
      return {
        goods: (<any>response.json()).map(
          (item: any) => {
            return this.mapResponseItemToGoods(item);
          }),
        count: count
      };
    });
  }

  invoiceList(id: number): Observable<any> {
    const url = `${LIST_URL}${'/invoice/'}${id}`;
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response: Response) => {
      const count: string = response.headers.get(HEADER_X_TOTAL_COUNT);
      return {
        goods: (<any>response.json()).map((item: any) => {
          return this.mapResponseItemToGoods(item);
        }),
        count: count
      };
    });
  }


  storedList(id: string, page?: number, count?: number): Observable<any> {
    const url = `${LIST_URL}${'/'}${id}${'/stored'}`;
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
    return this.httpAuthService.get(url, options).map((response: Response)=> {
      let count: string = response.headers.get(HEADER_X_TOTAL_COUNT);
      return {
        goods: (<any>response.json()).map(
          (item: any) => {
            return this.mapResponseItemToGoods(item);
          }),
        count: count
      };
    });
  }

  actApplicableList(id: string, page?: number, count?: number): Observable<any> {
    const url: string = `${LIST_URL}${"/"}${id}${"/act_applicable"}${"?page="}${page}${"&count="}${count}`;
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response: Response) => {
      const count: string = response.headers.get(HEADER_X_TOTAL_COUNT);
      return {
        goods: (<any>response.json()).map((item: any)=> {
          return this.mapResponseItemToGoods(item);
        }),
        count: count
      }
    });

  }

  get(id: number): Observable<Goods> {
    const url = `${GET_URL}${id}`;
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response: Response) => {
      return this.mapResponseItemToGoods(<any>response.json());
    });
  }


  save(goods: Goods): Observable<any> {
    let url = SAVE_URL;
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    if (goods.id) {
      url = `${SAVE_URL}${"/"}${goods.id}`;
      return this.httpAuthService.put(url, JSON.stringify(goods), options);
    } else {
      return this.httpAuthService.post(url, JSON.stringify(goods), options);
    }
  }

  getStatusNames(): Observable<GoodsStatusName[]> {
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_STATUS_NAMES_URL, options).map((response: Response) => {
      return response.json().map(
        item => {
          return new GoodsStatusName(item.id, item.name);
        }
      );
    });
  }

  updateStatuses(goods): Observable<void> {
    let counter: number = goods.length;
    return Observable.create(observer => {
        goods.forEach(item => {
            const url = `${UPDATE_STATUS_URL}${item.goods.id}`;
            const status: GoodsStatus = new GoodsStatus(null, null, item.newStatus.name, item.newStatus.note);
            this.httpAuthService.post(url, JSON.stringify(status)).subscribe(resp => {
                if (--counter == 0) {
                  observer.next();
                  observer.complete();
                }
              },
              error => {
                if (--counter == 0) {
                  observer.next();
                  observer.complete();
                }
              }
            );
          }
        );
      }
    );
  }

  getQuantityUnits(): Observable<Unit[]> {
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_QUANTITY_UNITS_URL, options).map((response: Response) => {
      return response.json().map(
        item => {
          return new Unit(item.id, item.name);
        }
      );
    });
  }

  getPriceUnits(): Observable<Unit[]> {
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_PRICE_UNITS_URL, options).map((response: Response) => {
      return response.json().map(
        item => {
          return new Unit(item.id, item.name);
        }
      );
    });
  }

  getWeightUnits(): Observable<Unit[]> {
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_WEIGHT_UNITS_URL, options).map((response: Response) => {
      return response.json().map(
        item => {
          return new Unit(item.id, item.name);
        }
      );
    });
  }

  getStorageSpaceTypes(): Observable<StorageSpaceType[]> {
    const headers: Headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_STORAGE_SPACE_TYPES_URL, options).map((response: Response) => {
      return response.json().map(
        item => {
          let type = new StorageSpaceType();
          type.idStorageSpaceType = item.idStorageSpaceType;
          type.name = item.name;
          return type;
        }
      );
    });
  }


  search(dto: GoodsSearchDTO, id: string, page?: number, count?: number): Observable<any> {
    const url: string = `${SEARCH_URL}${"/"}${id}${"?page="}${page}${"&count="}${count}`;
    return this.httpAuthService.post(url, JSON.stringify(dto)).map((response: Response) => {
      let count: string = response.headers.get(HEADER_X_TOTAL_COUNT);
      return {
        goods: (<any>response.json()).map((item: any) => {
          return this.mapResponseItemToGoods(item);
        }),
        count: count
      };
    });

  }


  public getStatusesForGoods(goodsId): Observable<GoodsStatus[]> {
    const url = `${GET_STATUSES_URL}${"/"}${goodsId}`;
    return this.httpAuthService.get(url).map((response: Response) => {
      return response.json().map(
        item => {
          const status = new GoodsStatus();
          status.id = item.id;
          status.date = item.date;
          status.name = item.name;
          status.note = item.note;
          const user = new User();
          user.id = item.id;
          user.lastName = item.user.lastName;
          user.firstName = item.user.firstName;
          user.patronymic = item.user.patronymic;
          status.user = user;
          return status;
        }
      );
    });

  }

  public putInStorage(goods: Goods): Observable<any> {
    return Observable.create(observer => {
        const url = `${PUT_IN_STORAGE_URL}${"/"}${goods.id}${"/put"}`;
        this.httpAuthService.put(url, JSON.stringify(goods)).subscribe(resp => {
            observer.next();
          },
          error => {
            observer.error("Failed to update cells:" + error);
          }
        );
      }
    );
  }

  public removeFromStorage(goods): Observable<any> {
    const url = `${REMOVE_FROM_STORAGE_URL}${goods.id}`;
    return this.httpAuthService.put(url);
  }

  private mapResponseItemToGoods(item: any): Goods {
    const goods = new Goods();
    goods.id = item.id;
    goods.name = item.name;
    goods.quantity = item.quantity;
    goods.weight = item.weight;
    goods.price = item.price;
    goods.storageType = new StorageType(item.storageType.idStorageSpaceType, item.storageType.name);
    goods.quantityUnit = new Unit(item.quantityUnit.id, item.quantityUnit.name);
    goods.weightUnit = new Unit(item.weightUnit.id, item.weightUnit.name);
    goods.priceUnit = new Unit(item.priceUnit.id, item.priceUnit.name);
    goods.warehouseId = item.warehouseId;
    goods.cells = item.cells.map(item => {
        const storageCell = new StorageCell();
        storageCell.number = item.number;
        storageCell.idStorageCell = item.idStorageCell;
        return storageCell;
      }
    )
    goods.currentStatus = item.currentStatus ?
      new GoodsStatus(
        item.currentStatus.id,
        item.currentStatus.date,
        item.currentStatus.name,
        item.currentStatus.note
      ) : null;
    goods.registeredStatus = item.registeredStatus ?
      new GoodsStatus(
        item.registeredStatus.id,
        item.registeredStatus.date,
        item.registeredStatus.name,
        item.registeredStatus.note
      ) : null;
    goods.movedOutStatus = item.movedOutStatus ?
      new GoodsStatus(
        item.movedOutStatus.id,
        item.movedOutStatus.date,
        item.movedOutStatus.name,
        item.movedOutStatus.note
      ) : null;
    return goods;
  }

}
