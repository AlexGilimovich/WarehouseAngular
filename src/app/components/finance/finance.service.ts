import { Injectable } from "@angular/core";
import { HttpAuthService } from "../login/httpAuth.service";
import { Price } from "./price";
import { Observable } from "rxjs/Rx";
import { PriceDTO } from "./priceDTO";
import { Host } from '../../util/host';


const BASE_URL = Host.getURL();
const GET_URL = `${BASE_URL}${'finance/price'}`;
const GET_CURRENT_URL = `${BASE_URL}${'finance/currentPrices'}`;
const POST_URL = `${BASE_URL}${'finance/newPrice'}`;
const SEARCH_URL = `${BASE_URL}${'finance/type_date_price'}`;


@Injectable()
export class FinanceService {

  constructor(private httpAuthService: HttpAuthService) {
  }

  public getPriceList(): Observable<Price[]> {
    return this.httpAuthService.get(GET_URL).map(
      (resp) => {
        return resp.json().map(
          item => {
            return this.mapResponseItemToPrice(item);
          }
        );
      }
    );
  }

  public getCurrentPriceList(): Observable<Price[]> {
    return this.httpAuthService.get(GET_CURRENT_URL).map(
      (resp) => {
        return resp.json().map(
          item => {
            return this.mapResponseItemToPrice(item);
          }
        );
      }
    );
  }

  public savePriceList(priceDTOs: PriceDTO[]): Observable<any> {
    let count = priceDTOs.length;
    return Observable.create(
      observer => {
        priceDTOs.forEach(
          item => {
            this.savePrice(item).subscribe(
              resp => {
                if (--count === 0) {
                  observer.next();
                }
              },
              error => {
                if (--count === 0) {
                  observer.next();
                }
              }
            );
          }
        );
      }
    );
  }

  private savePrice(priceDTO: PriceDTO): Observable<any> {
    return this.httpAuthService.post(POST_URL, JSON.stringify(priceDTO));
  }


  public find(dateStart: string, dateEnd: string, storageSpaceTypeId: string): Observable<Price> {
    return this.httpAuthService.get(`${SEARCH_URL}${'?'}${'startDate='}${dateStart}${'&endDate='}${dateEnd}${'&idStorageSpaceType='}${storageSpaceTypeId}`).map(
      (resp) => {
        return resp.json().map(
          item => {
            return this.mapResponseItemToPrice(item);
          }
        );
      }
    );
  }

  private mapResponseItemToPrice(item: any): Price {
    const price: Price = new Price();
    price.idPriceList = item.idPriceList;
    price.comment = item.comment;
    price.dailyPrice = item.dailyPrice;
    price.startTime = item.startTime;
    price.endTime = item.endTime;
    price.idStorageSpaceType = item.idStorageSpaceType;
    return price;
  }

}
