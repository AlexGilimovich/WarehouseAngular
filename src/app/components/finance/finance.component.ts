import {Component, OnInit} from "@angular/core";
import {FinanceService} from "./finance.service";
import {StorageSpaceType} from "../warehouse-scheme/storage-space-type";
import {GoodsService} from "../goods/goods.service";
declare var $;

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  private priceList;
  private storageTypes:StorageSpaceType[];
  private searchDTO = {startDate: '', endDate: '', searchStorageType: ''};

  constructor(private financeService:FinanceService,
              private goodsService:GoodsService) {
  }

  ngOnInit() {
    $('body').foundation();
    this.financeService.getPriceList().subscribe(
      res=> {
        this.priceList = res;
      }
    );
    this.goodsService.getStorageSpaceTypes().subscribe(
      (res) => {
        this.storageTypes = res;
        let emptyType = new StorageSpaceType();
        emptyType.name = '';
        this.storageTypes.push(emptyType);
      },
      (err)=> {
        console.error(err);
      }
    );
  }

  private openModal() {
    $('#priceListModal').foundation('open');
  }

  private submit() {
    this.financeService.find(this.searchDTO.startDate, this.searchDTO.endDate, this.searchDTO.searchStorageType).subscribe(
      res=> {
        this.priceList = res;
      }
    );
  }

  private clear() {
    this.searchDTO = {startDate: '', endDate: '', searchStorageType: ''};
  }

  private updatePrices(){
    this.financeService.savePriceList(this.priceList).subscribe(
      res=>{
        
      },
      error=>{
        
      }
    );
  }
}
