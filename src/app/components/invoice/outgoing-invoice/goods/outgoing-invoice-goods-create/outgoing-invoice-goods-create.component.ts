import { Component, OnInit } from '@angular/core';
import {Goods} from "../../../../goods/goods";
import {GoodsService} from "../../../../goods/goods.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-outgoing-invoice-goods-create',
  templateUrl: './outgoing-invoice-goods-create.component.html',
  styleUrls: ['./outgoing-invoice-goods-create.component.scss']
})
export class OutgoingInvoiceGoodsCreateComponent implements OnInit {
  goodsForm: FormGroup;
  currentChosenGoods: Goods;
  quantity: number;
  goodsList: Goods[] = [];
  leftQuantity: number;

  constructor(private goodsService: GoodsService,
              private formBuilder: FormBuilder) {
    this.currentChosenGoods = new Goods();
    this.currentChosenGoods.quantity = '0';
    this.quantity = 0;
  }

  ngOnInit() {
    const warehouseId = '10'; //todo remove
    this.goodsService.list(warehouseId, 1, -1).subscribe(data => {
      this.goodsList = data.goods;
    });
  }

  onSubmit() {
    let goods: Goods;
    goods = this.currentChosenGoods;
    goods.quantity = this.quantity.toString();
    this.goodsService.goodsChosenEvent(goods);
  }

  onQuantityChanged() {
    const typedQuantity = this.quantity;
    this.leftQuantity = Number.parseInt(this.currentChosenGoods.quantity) - typedQuantity;
    if (this.leftQuantity < 0) {
      this.leftQuantity = 0;
    }
  }
}
