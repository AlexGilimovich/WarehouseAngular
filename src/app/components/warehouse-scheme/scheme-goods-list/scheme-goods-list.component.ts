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
  private goodsList: Goods[];

  constructor(private goodsService: GoodsService,
              private warehouseSchemeService: WarehouseSchemeService) {
  }

  ngOnInit() {
    this.getGoodsListFromServer();
  }

  private getGoodsListFromServer(): void {
    this.goodsService.list(this.id_warehouse.toString()).subscribe(res => {
        this.goodsList = res.goods;
        console.log(this.goodsList);
      },
      error => {
        console.error(error);
      });
  }

  private goodsWereSelected(goods: Goods): void {
    this.warehouseSchemeService.goodsWereSelected(goods);
  }

}
