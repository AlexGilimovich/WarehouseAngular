import {Injectable} from "@angular/core";
import {HttpAuthService} from "../login/httpAuth.service";
import {Observable} from "rxjs";
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
import {observable} from "rxjs/symbol/observable";
import {GoodsSearchDTO} from "./goodsSearchDTO";
import {User} from "../user/user";


const LIST_URL:string = "http://localhost:8080/web/web/goods";
const GET_URL:string = "http://localhost:8080/web/web/goods/";
const SAVE_URL:string = "http://localhost:8080/web/web/goods/save";
const GET_STATUS_NAMES_URL:string = "http://localhost:8080/web/web/goods/statuses";
const GET_UNITS_URL:string = "http://localhost:8080/web/web/goods/units";
const GET_STORAGE_SPACE_TYPES_URL:string = "http://localhost:8080/web/web/goods/storageTypes";
const UPDATE_STATUS_URL:string = "http://localhost:8080/web/web/goods/status/";
const SEARCH_URL:string = "http://localhost:8080/web/web/goods/search";
const GET_STATUSES_URL:string = "http://localhost:8080/web/web/goods/status";


@Injectable()
export class GoodsService {

  constructor(private httpAuthService:HttpAuthService) {
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
            return new Goods(
              item.id,
              item.name,
              item.quantity,
              item.weight,
              item.price,
              new StorageType(item.storageType.idStorageSpaceType, item.storageType.name),
              new Unit(item.quantityUnit.id, item.quantityUnit.name),
              new Unit(item.quantityUnit.id, item.weightUnit.name),
              new Unit(item.quantityUnit.id, item.priceUnit.name),
              item.cells.map(
                item=> {
                  let storageCell = new StorageCell();
                  storageCell.number = item.number;
                  storageCell.idStorageCell = item.idStorageCell;
                  return storageCell;
                }
              ),
              // item.cells.map(
              //   item=> {
              //     let storageSpace = new StorageSpace();
              //     storageSpace.idStorageSpace = item.idStorageSpace;
              //     return storageSpace;
              //   }
              // ),
              null,
              item.status ?
                new GoodsStatus(
                  item.status.id,
                  item.status.date,
                  item.status.goodsStatusName.name,
                  item.status.note
                ) : null
            )
          }),
        count: count
      }
    });

  }

  get(id:number):Observable<Goods> {
    const url = `${GET_URL}${id}`;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    return this.httpAuthService.get(url, options).map((response:Response) => {
      const item = response.json();
      return new Goods(
        item.id,
        item.name,
        item.quantity,
        item.weight,
        item.price,
        new StorageType(item.storageType.idStorageSpaceType, item.storageType.name),
        new Unit(item.quantityUnit.id, item.quantityUnit.name),
        new Unit(item.quantityUnit.id, item.weightUnit.name),
        new Unit(item.quantityUnit.id, item.priceUnit.name),
        item.cells.map(
          item=> {
            let storageCell = new StorageCell();
            storageCell.number = item.number;
            storageCell.idStorageCell = item.idStorageCell;
            return storageCell;
          }
        ),
        // item.cells.map(
        //   item=> {
        //     let storageSpace = new StorageSpace();
        //     storageSpace.idStorageSpace = item.idStorageSpace;
        //     return storageSpace;
        //   }
        // ),
        null,
        item.status ?
          new GoodsStatus(
            item.status.id,
            item.status.date,
            item.status.goodsStatusName.name,
            item.status.note
          ) : null
      )
    })
  }

  save(goods:Goods):Observable<any> {
    let url = SAVE_URL;
    let headers:Headers = new Headers();
    let options = new RequestOptions({headers: headers});
    if (goods.id != undefined) {
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
            return new Goods(
              item.id,
              item.name,
              item.quantity,
              item.weight,
              item.price,
              new StorageType(item.storageType.idStorageSpaceType, item.storageType.name),
              new Unit(item.quantityUnit.id, item.quantityUnit.name),
              new Unit(item.quantityUnit.id, item.weightUnit.name),
              new Unit(item.quantityUnit.id, item.priceUnit.name),
              item.cells.map(
                item=> {
                  let storageCell = new StorageCell();
                  storageCell.number = item.number;
                  storageCell.idStorageCell = item.idStorageCell;
                  return storageCell;
                }
              ),
              // item.cells.map(
              //   item=> {
              //     let storageSpace = new StorageSpace();
              //     storageSpace.idStorageSpace = item.idStorageSpace;
              //     return storageSpace;
              //   }
              // ),
              null,
              item.status ?
                new GoodsStatus(
                  item.status.id,
                  item.status.date,
                  item.status.goodsStatusName.name,
                  item.status.note
                ) : null
            )
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
          status.name = item.goodsStatusName.name;
          status.note = item.note;
          let user = new User();
          user.id = item.id;
          user.lastName = item.lastName;
          user.firstName = item.firstName;
          user.patronymic = item.patronymic;
          status.user = user;
          return status;
        }
      )
    })

  }




}
