import { Component, OnInit } from '@angular/core';
import { CompaniesFinanceService } from './companies-finance.service';
import { PriceForCompany } from './priceForCompany';
import { WarehouseCompany } from '../warehouse-company/warehouse-company';
import { WarehouseCompanyService } from '../warehouse-company/warehouse-company.service';

@Component({
  selector: 'app-companies-finance',
  templateUrl: './companies-finance.component.html',
  styleUrls: ['./companies-finance.component.scss']
})
export class CompaniesFinanceComponent implements OnInit {

  private priceList: PriceForCompany[];
  private companies: WarehouseCompany[];

  constructor(private financeService: CompaniesFinanceService,
              private companyService: WarehouseCompanyService) {
  }

  ngOnInit() {
    this.getCompaniesFromServer();
  }


  private getCompaniesFromServer(): void {
    this.companyService.getAllCompany().subscribe(res => {
        this.companies = res;
        this.getPriceListFromServer();
      }
    );
  }

  private updatePrice(price: PriceForCompany, newPrice: string): void {
    price.pricePerMonth = newPrice;
    this.financeService.savePrice(price).subscribe(resp => {
        price.initialPrice = newPrice;
      }, error => {
        price.pricePerMonth = price.initialPrice;
      }
    );
  }


  private getPriceListFromServer(): void {
    this.financeService.getCurrentPriceList().subscribe(res => {
        this.createPriceListArray(res);
      }
    );
  }

  private createPriceListArray(prices: PriceForCompany[]): void {
    this.priceList = this.companies.map(company => {
      const currentPrice = this.getPriceForCompany(prices, company);

      const price = new PriceForCompany();
      price.idWarehouseCompany = company.idWarehouseCompany;
      price.companyName = company.name;
      price.initialPrice = price.pricePerMonth = currentPrice ? currentPrice.pricePerMonth : '';
      price.startTime = currentPrice ? currentPrice.startTime : '';
      price.endTime = currentPrice ? currentPrice.endTime : '';
      return price;
    });
  }

  private getPriceForCompany(prices: PriceForCompany[], company: WarehouseCompany): PriceForCompany {
    return prices.find(predicate => {
      return predicate.idWarehouseCompany === company.idWarehouseCompany;
    });
  }


}
