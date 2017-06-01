import {Injectable} from "@angular/core";
import {HttpAuthService} from "../login/httpAuth.service";
import {Observable, Subject} from "rxjs";
import {Response, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Goods} from "./goods";
import {GoodsStatusName} from "./goodsStatusName";
import {Unit} from "./unit";
import {StorageSpaceType} from "../warehouse-scheme/storage-space-type";
import {StorageType} from "./storageType";
import {StorageCell} from "../warehouse-scheme/storage-cell";
import {GoodsStatus} from "./goodsStatus";
import {GoodsSearchDTO} from "./goodsSearchDTO";
import {User} from "../user/user";


const BASE_URL:string = "http://localhost:8080/web/web/goods";
const LIST_URL:string = "http://localhost:8080/web/web/goods";
const GET_URL:string = "http://localhost:8080/web/web/goods/";
const SAVE_URL:string = "http://localhost:8080/web/web/goods/save";
const GET_STATUS_NAMES_URL:string = "http://localhost:8080/web/web/goods/statuses";
const GET_UNITS_URL:string = "http://localhost:8080/web/web/goods/units";
const GET_STORAGE_SPACE_TYPES_URL:string = "http://localhost:8080/web/web/goods/storageTypes";
const UPDATE_STATUS_URL:string = "http://localhost:8080/web/web/goods/status/";
const SEARCH_URL:string = "http://localhost:8080/web/web/goods/search";
const GET_STATUSES_URL:string = "http://localhost:8080/web/web/goods/status";
const REMOVE_FROM_STORAGE_URL = "http://localhost:8080/web/web/goods/remove/";
@Injectable()
export class GoodsService {
  private goodsSource = new Subject<Goods>();
  goodsCreated$ = this.goodsSource.asObservable();

  private goodsForOutgoingInvoiceSource = new Subject<Goods>();
  goodsForOutgoingInvoice$ = this.goodsForOutgoingInvoiceSource.asObservable();

  public selectedForPuttingGoodsSource = new Subject<any>();
  public selectedForPuttingGoods$ = this.selectedForPuttingGoodsSource.asObservable();


  constructor(private httpAuthService:HttpAuthService) {
  }

  //Event emitted when user finished creating goods
  public goodsCreatedEvent(goods:Goods) {
    this.goodsSource.next(goods);
  }

  goodsChosenEvent(goods: Goods) {
    this.goodsForOutgoingInvoiceSource.next(goods);
  }

  list(id:string, page:number, count:number):Observable<any> {
    const url:string = `${LIST_URL}${"/"}${id}${"/list"}${"?page="}${page}${"&count="}${count}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response)=> {
      let count:string = response.headers.get("x-total-count");
      return {
        goods: (<any>response.json()).map(
          item=> {
            let goods = new Goods();
            goods.id = item.id;
            goods.name = item.name;
            goods.quantity = item.quantity;
            goods.weight = item.weight;
            goods.price = item.price;
            goods.storageType = new StorageType(item.storageType.idStorageSpaceType, item.storageType.name);
            goods.quantityUnit = new Unit(item.quantityUnit.id, item.quantityUnit.name);
            goods.weightUnit = new Unit(item.weightUnit.id, item.weightUnit.name);
            goods.priceUnit = new Unit(item.priceUnit.id, item.priceUnit.name);
            goods.cells = item.cells.map(
              item=> {
                let storageCell = new StorageCell();
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
          }),
        count: count
      }
    });

  }

  getAll() {
    const url = GET_URL;
    const headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response: Response) => {
      return response.json().map(item => {
        return new Goods(
          item.id,
          item.name,
          item.quantity,
          item.weight,
          item.price,
          new StorageType(item.storageType.idStorageSpaceType, item.storageType.name),
          new Unit(item.quantityUnit.id, item.quantityUnit.name),
          new Unit(item.weightUnit.id, item.weightUnit.name),
          new Unit(item.priceUnit.id, item.priceUnit.name)
        );
      });
    });
  }

  get(id:number):Observable<Goods> {
    const url = `${GET_URL}${id}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response) => {
      const item = response.json();
      let goods = new Goods();
      goods.id = item.id;
      goods.name = item.name;
      goods.quantity = item.quantity;
      goods.weight = item.weight;
      goods.price = item.price;
      goods.storageType = new StorageType(item.storageType.idStorageSpaceType, item.storageType.name);
      goods.quantityUnit = new Unit(item.quantityUnit.id, item.quantityUnit.name);
      goods.weightUnit = new Unit(item.weightUnit.id, item.weightUnit.name);
      goods.priceUnit = new Unit(item.priceUnit.id, item.priceUnit.name);
      goods.cells = item.cells.map(
        item=> {
          let storageCell = new StorageCell();
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
    })
  }


  save(goods:Goods):Observable<any> {
    let url = SAVE_URL;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    if (goods.id) {
      url = `${SAVE_URL}${"/"}${goods.id}`;
      return this.httpAuthService.put(url, JSON.stringify(goods), options);
    } else {
      return this.httpAuthService.post(url, JSON.stringify(goods), options);
    }
  }

  getStatusNames():Observable<GoodsStatusName[]> {
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_STATUS_NAMES_URL, options).map((response:Response) => {
      return response.json().map(
        item => {
          return new GoodsStatusName(item.id, item.name);
        }
      )
    })
  }

  updateStatuses(goods):Observable<void> {
    let counter:number = goods.length;
    return Observable.create(
      observer=> {
        goods.forEach(
          item=> {
            const url:string = `${UPDATE_STATUS_URL}${item.goods.id}`;
            let status:GoodsStatus = new GoodsStatus(null, null, item.newStatus.name, item.newStatus.note);
            this.httpAuthService.post(url, JSON.stringify(status)).subscribe(
              resp=> {
                if (--counter == 0)
                  observer.next();
              },
              error=> {
                if (--counter == 0)
                  observer.next();
              }
            )
          }
        );
      }
    )

  }

  getUnits():Observable<Unit[]> {
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_UNITS_URL, options).map((response:Response) => {
      return response.json().map(
        item => {
          return new Unit(item.id, item.name);
        }
      )
    })
  }

  getStorageSpaceTypes():Observable<StorageSpaceType[]> {
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(GET_STORAGE_SPACE_TYPES_URL, options).map((response:Response) => {
      return response.json().map(
        item => {
          let type = new StorageSpaceType();
          type.idStorageSpaceType = item.idStorageSpaceType;
          type.name = item.name;
          return type;
        }
      )
    })
  }


  search(dto:GoodsSearchDTO, id:string, page:number, count:number):Observable<any> {
    const url:string = `${SEARCH_URL}${"/"}${id}${"?page="}${page}${"&count="}${count}`;
    return this.httpAuthService.post(url, JSON.stringify(dto)).map((response:Response)=> {
      let count:string = response.headers.get("x-total-count");
      return {
        goods: (<any>response.json()).map(
          item=> {
            let goods = new Goods();
            goods.id = item.id;
            goods.name = item.name;
            goods.quantity = item.quantity;
            goods.weight = item.weight;
            goods.price = item.price;
            goods.storageType = new StorageType(item.storageType.idStorageSpaceType, item.storageType.name);
            goods.quantityUnit = new Unit(item.quantityUnit.id, item.quantityUnit.name);
            goods.weightUnit = new Unit(item.weightUnit.id, item.weightUnit.name);
            goods.priceUnit = new Unit(item.priceUnit.id, item.priceUnit.name);
            goods.cells = item.cells.map(
              item=> {
                let storageCell = new StorageCell();
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
          }),
        count: count
      }
    });

  }


  public getStatusesForGoods(goodsId):Observable<GoodsStatus[]> {
    const url:string = `${GET_STATUSES_URL}${"/"}${goodsId}`;
    return this.httpAuthService.get(url).map((response:Response) => {
      return response.json().map(
        item => {
          let status = new GoodsStatus();
          status.id = item.id;
          status.date = item.date;
          status.name = item.name;
          status.note = item.note;
          let user = new User();
          user.id = item.id;
          user.lastName = item.user.lastName;
          user.firstName = item.user.firstName;
          user.patronymic = item.user.patronymic;
          status.user = user;
          return status;
        }
      )
    })

  }

  public putInStorage(goods):Observable<any> {
    return Observable.create(
      observer=> {
        const url:string = `${BASE_URL}${"/"}${goods.id}${"/put"}`;
        this.httpAuthService.put(url, JSON.stringify(goods)).subscribe(
          resp=> {
            observer.next();
          },
          error=> {
            observer.error("Failed to update cells" + error);
          }
        )


      }
    )
  }

  public removeFromStorage(goods):Observable<any> {
    let counter:number = goods.length;
    const url:string = `${REMOVE_FROM_STORAGE_URL}${goods.id}`;
    return this.httpAuthService.put(url);

  }

}
