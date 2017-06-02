import { Component, OnInit } from '@angular/core';
import {Goods} from "../goods";
import {GoodsService} from "../goods.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-goods-choice',
  templateUrl: './goods-choice.component.html',
  styleUrls: ['./goods-choice.component.scss']
})
export class GoodsChoiceComponent implements OnInit {
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
