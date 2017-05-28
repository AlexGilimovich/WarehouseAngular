import {Injectable} from "@angular/core";
import {HttpAuthService} from "../login/httpAuth.service";
import {Price} from "./price";
import {Observable} from "rxjs/Rx";
import {WarehouseCompany} from "../warehouse-company/warehouse-company";
import {PriceDTO} from "./priceDTO";

export const GET_URL = "http://localhost:8080/web/web/finance/price";
export const POST_URL = "http://localhost:8080/web/web/finance/newPrice";
export const SEARCH_URL = "http://localhost:8080/web/web/finance/type_date_price";

@Injectable()
export class FinanceService {

  constructor(private httpAuthService:HttpAuthService) {
  }

  public getPriceList():Observable<Price[]> {
    return this.httpAuthService.get(GET_URL).map(
      (resp)=> {
        return resp.json().map(
          item=> {
            let price:Price = new Price();
            price.idPriceList = item.idPriceList;
            price.comment = item.comment;
            price.dailyPrice = item.dailyPrice;
            price.startTime = item.startTime;
            price.endTime = item.endTime;
            let warehouseCompany = new WarehouseCompany();
            warehouseCompany.idWarehouseCompany = item.warehouseCompany.idWarehouseCompany;
            warehouseCompany.name = item.warehouseCompany.name;
            warehouseCompany.status = item.warehouseCompany.status;
            price.warehouseCompany = warehouseCompany;
            return price;
          }
        );
      }
    );
  }

  public savePriceList(priceDTOs:PriceDTO[]):Observable<any> {
    let count = priceDTOs.length;
    return Observable.create(
      observer=> {
        priceDTOs.forEach(
          item=> {
            this.httpAuthService.post(POST_URL, JSON.stringify(item)).map(
              resp=> {
                if (--count == 0) observer.next();
              },
              error=> {
                if (--count == 0) observer.next();
              }
            )
          }
        );
      }
    )
  }

  public find(dateStart:string, dateEnd:string, storageSpaceTypeId:string):Observable<Price> {
    return this.httpAuthService.get(`${SEARCH_URL}${'?'}${'dateStart='}${dateStart}${'&dateEnd='}${dateEnd}${'&storageSpaceTypeId='}${storageSpaceTypeId}`).map(
      (resp)=> {
        return resp.json().map(
          item=> {
            let price:Price = new Price();
            price.idPriceList = item.idPriceList;
            price.comment = item.comment;
            price.dailyPrice = item.dailyPrice;
            price.startTime = item.startTime;
            price.endTime = item.endTime;
            let warehouseCompany = new WarehouseCompany();
            warehouseCompany.idWarehouseCompany = item.warehouseCompany.idWarehouseCompany;
            warehouseCompany.name = item.warehouseCompany.name;
            warehouseCompany.status = item.warehouseCompany.status;
            price.warehouseCompany = warehouseCompany;
            return price;
          }
        );
      }
    );
  }

}
