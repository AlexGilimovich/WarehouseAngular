import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../../goods/goods.service';
import { Goods } from '../../goods/goods';
import { Unit } from '../../goods/unit';
import { unitMessages } from '../../goods/goods.module';
import { WarehouseSchemeService } from '../warehouse-scheme.service';

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

  constructor(private goodsService: GoodsService,
              private warehouseSchemeService: WarehouseSchemeService) {
  }

  ngOnInit() {
    this.getGoodsListFromServer();
  }

  private getGoodsListFromServer(): void {
    if (!this.id_invoice) {
      this.goodsService.list(this.id_warehouse.toString()).subscribe(res => {
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
