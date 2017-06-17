import { Component, OnInit } from "@angular/core";
import { FinanceService } from "./finance.service";
import { StorageSpaceType } from "../warehouse-scheme/storage-space-type";
import { GoodsService } from "../goods/goods.service";
import { storageTypeWithId } from "./finance.module";
import { PriceDTO } from "./priceDTO";
import { Price } from './price';
declare var $;

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  private priceList: Price[];
  private historyPrices: Price[];
  private storageTypes: StorageSpaceType[];
  private storageTypeMessages = storageTypeWithId;
  private newPrices: PriceDTO[];
  private newPricesComment = '';

  constructor(private financeService: FinanceService,
              private goodsService: GoodsService) {
  }

  ngOnInit() {
    this.getPriceListFromServer();
    this.getPriceListHistoryFromServer();
    this.getStorageTypesFromServer();
    this.initFoundation();
  }

  private initFoundation(): void {
    $('#priceListModal').foundation();
    $('#accordion').foundation();
  }

  private createNewPricesArray() {
    this.newPrices = this.priceList.map((price: Price) => {
      const p = new PriceDTO();
      p.idStorageSpaceType = price.idStorageSpaceType;
      p.dailyPrice = price.dailyPrice;
      return p;
    });
  }

  setNewPrices(): void {
    if (!this.newPrices) {
      this.createNewPricesArray();
    }
    this.openModal();
  }

  private getPriceListFromServer(): void {
    this.financeService.getCurrentPriceList().subscribe(
      res => {
        this.priceList = res.sort((current, next) => {
          return current.startTime < next.startTime ? 1 : -1;
        });
      }
    );
  }

  private getPriceListHistoryFromServer(): void {
    this.financeService.getPriceList().subscribe(
      res => {
        this.historyPrices = res.sort((current, next) => {
          return current.startTime < next.startTime ? 1 : -1;
        });
      }
    );
  }

  private getStorageTypesFromServer(): void {
    this.goodsService.getStorageSpaceTypes().subscribe(
      (res) => {
        this.storageTypes = res;
      }, (err) => {
        console.error(err);
      }
    );
  }

  private openModal() {
    $('#priceListModal').foundation('open');
  }

  private closeModal() {
    $('#priceListModal').foundation('close');
  }

  private updatePrices() {
    this.setCommentToNewPrices(this.newPricesComment);
    this.financeService.savePriceList(this.newPrices.filter(item => {
        return item.dailyPrice;
      }
    )).subscribe(res => {
        this.getPriceListFromServer();
        this.getPriceListHistoryFromServer()
        this.closeModal();
        // this.clearNewPrices();
      }, error => {

      }
    );
  }

  private clearNewPrices() {
    this.newPrices.forEach(item => {
        item.dailyPrice = '';
      }
    );
    this.newPricesComment = '';
  }

  private setCommentToNewPrices(comment: string) {
    this.newPrices.forEach(item => {
        item.comment = comment;
      }
    );
  }
}
