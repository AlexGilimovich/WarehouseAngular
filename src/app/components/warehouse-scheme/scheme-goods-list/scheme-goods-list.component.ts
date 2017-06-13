import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../../goods/goods.service';
import { Goods } from '../../goods/goods';
import { WarehouseSchemeService } from '../warehouse-scheme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scheme-goods-list',
  templateUrl: './scheme-goods-list.component.html',
  styleUrls: ['./scheme-goods-list.component.scss']
})
export class SchemeGoodsListComponent implements OnInit {
  @Input() private id_warehouse: number;
  @Input() private id_invoice: number;
  private goodsList: Goods[];
  private selectedId: string;
  private placedGoods: Goods[] = [];
  private cellsSelectedSubscription: Subscription;

  constructor(private goodsService: GoodsService,
              private warehouseSchemeService: WarehouseSchemeService) {
    // this.cellsSelectedSubscription = this.warehouseSchemeService.cartItems$.subscribe((goods: Goods) => {
    //     this.placedGoods.push(goods);
    //     this.goodsList.splice(this.goodsList.findIndex((item: Goods) => {
    //       return item.id = goods.id;
    //     }), 1);
    //   }
    // );
  }

  ngOnInit() {
    this.getGoodsListFromServer();
  }

  private putAllInStorage() {
    this.placedGoods.forEach(goods => {
      this.goodsService.putInStorage(goods).subscribe(res => {

        },
        error => {
          console.error(error);
        }
      );
    });
  }

  private getGoodsListFromServer(): void {
    if (!this.id_invoice) {
      this.goodsService.storedList(this.id_warehouse.toString()).subscribe(res => {
          this.goodsList = res.goods;
        },
        error => {
          console.error(error);
        });
    } else {
      this.goodsService.invoiceList(this.id_invoice).subscribe(res => {
          this.goodsList = res.goods;
        },
        error => {
          console.error(error);
        });
    }
  }

  private goodsWereSelected(goods: Goods): void {
    this.selectedId = goods.id;
    this.warehouseSchemeService.goodsWereSelected(goods);
  }

}
