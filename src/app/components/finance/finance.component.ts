import { Component, OnInit } from "@angular/core";
import { FinanceService } from "./finance.service";
import { StorageSpaceType } from "../warehouse-scheme/storage-space-type";
import { GoodsService } from "../goods/goods.service";
import { storageTypeWithId } from "./finance.module";
import { PriceDTO } from "./priceDTO";
declare var $;

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  private priceList;
  private storageTypes: StorageSpaceType[];
  private storageTypeMessages = storageTypeWithId;
  private searchDTO = {startDate: '', endDate: '', searchStorageType: ''};
  private newPrices: PriceDTO[] = [];
  private newPricesComment = '';

  constructor(private financeService: FinanceService,
              private goodsService: GoodsService) {
  }

  ngOnInit() {
    $('body').foundation();
    this.getPriceListFromServer();
    this.getStorageTypesFromServer();
  }

  private createNewPricesArray(): PriceDTO[] {
    return this.storageTypes.map(item => {
      const price = new PriceDTO();
      price.idStorageSpaceType = item.idStorageSpaceType;
      return price;
    });
  }

  private getPriceListFromServer(): void {
    this.financeService.getPriceList().subscribe(
      res => {
        this.priceList = res;
      }
    );
  }

  private getStorageTypesFromServer(): void {
    this.goodsService.getStorageSpaceTypes().subscribe(
      (res) => {
        this.storageTypes = res;
        this.newPrices = this.createNewPricesArray();
      },
      (err) => {
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

  private search() {
    this.financeService.find(this.searchDTO.startDate, this.searchDTO.endDate, this.searchDTO.searchStorageType).subscribe(
      res => {
        this.priceList = res;
      }
    );
  }

  private clear() {
    this.searchDTO = {startDate: '', endDate: '', searchStorageType: ''};
  }

  private updatePrices() {
    this.setCommentToNewPrices(this.newPricesComment);
    this.financeService.savePriceList(this.newPrices.filter(item => {
        return item.dailyPrice;
      }
    )).subscribe(
      res => {
        this.getPriceListFromServer();
        this.closeModal();
        this.clearNewPrices();
      },
      error => {

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
