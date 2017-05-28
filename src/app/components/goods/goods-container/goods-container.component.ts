import {Component, OnInit, OnDestroy} from '@angular/core';
import {WarehouseSchemeService} from "../../warehouse-scheme/warehouse-scheme.service";
import {Subscription} from "rxjs";
import {StorageCell} from "../../warehouse-scheme/storage-cell";
import {GoodsService} from "../goods.service";

@Component({
  selector: 'app-goods-container',
  templateUrl: './goods-container.component.html',
  styleUrls: ['./goods-container.component.scss']
})
export class GoodsContainerComponent implements OnInit,OnDestroy {
  private cellsSelectedSubscription:Subscription;
  private goodsSelectedForPuttingSubscription:Subscription;
  private goodsSelectedForPutting;

  constructor(private goodsService:GoodsService,
              private warehouseSchemeService:WarehouseSchemeService) {

    this.goodsSelectedForPuttingSubscription = this.goodsService.selectedForPuttingGoods$.subscribe(
      res=> {
        this.goodsSelectedForPutting = res;
      }
    );

    this.cellsSelectedSubscription = this.warehouseSchemeService.cartItems$.subscribe(
      cells => {
        this.goodsSelectedForPutting.cells = [];
        cells.forEach(
          cell=> {
            this.goodsSelectedForPutting.cells.push(cell);
          }
        );
        this.putInStorage(this.goodsSelectedForPutting);
      }
    );
  }

  ngOnDestroy() {
    this.cellsSelectedSubscription.unsubscribe();
    this.goodsSelectedForPuttingSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  private putInStorage(goods) {
    // this.goodsService.putInStorage(this.goodsList.filter(
    //   item=> {
    //     return item.moved;
    //   }
    // ));
    this.goodsService.putInStorage(goods).subscribe(
      res=>{
        //todo smth
      },
      error=>{

      }
    );
  }

}
