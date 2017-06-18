import { Injectable } from '@angular/core';
import { Host } from '../../util/host';
import { Observable } from 'rxjs/Rx';
import { PriceForCompany } from './priceForCompany';
import { HttpAuthService } from '../login/httpAuth.service';


const BASE_URL = Host.getURL();
const GET_CURRENT_URL = `${BASE_URL}${'finance/company/currentPrices'}`;
const POST_URL = `${BASE_URL}${'finance/company/newPrice'}`;


@Injectable()
export class CompaniesFinanceService {

  constructor(private httpAuthService: HttpAuthService) {
  }

  public getCurrentPriceList(): Observable<PriceForCompany[]> {
    return this.httpAuthService.get(GET_CURRENT_URL).map((resp) => {
        return resp.json().map(item => {
            return this.mapResponseItemToPrice(item);
          }
        );
      }
    );
  }

  public savePrice(priceDTO: PriceForCompany): Observable<any> {
    return this.httpAuthService.post(POST_URL, JSON.stringify(priceDTO));
  }

  private mapResponseItemToPrice(item: any): PriceForCompany {
    const price: PriceForCompany = new PriceForCompany();
    price.id = item.idPriceList;
    price.comment = item.comment;
    price.pricePerMonth = item.pricePerMonth;
    price.startTime = item.startTime;
    price.endTime = item.endTime;
    price.idWarehouseCompany = item.idWarehouseCompany;
    return price;
  }


}
