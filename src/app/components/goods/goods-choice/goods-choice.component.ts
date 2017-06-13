import { Component, OnInit } from '@angular/core';
import {Goods} from "../goods";
import {GoodsService} from "../goods.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../../login/login.service";

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
              private loginService: LoginService,
              private formBuilder: FormBuilder) {
    this.currentChosenGoods = new Goods();
    this.currentChosenGoods.quantity = '0';
    this.quantity = 0;
  }

  ngOnInit() {
    const warehouseId = this.loginService.getLoggedUser().warehouse.idWarehouse.toString();
    this.goodsService.storedList(warehouseId).subscribe(data => {
      this.goodsList = data.goods;
    });
  }

  onSubmit() {
    let goods: Goods;
    goods = this.getPartOfGoods(this.currentChosenGoods);
    goods.quantity = this.quantity.toString();
    this.goodsService.goodsChosenEvent(goods);
  }

  onQuantityChanged() {
    const typedQuantity = this.quantity;
    const currentGoodsQuantity = Number.parseFloat(this.currentChosenGoods.quantity);
    this.leftQuantity = currentGoodsQuantity - typedQuantity;
    if (this.leftQuantity < 0) {
      this.leftQuantity = 0;
    }
    if (this.quantity > currentGoodsQuantity) {
      this.quantity = currentGoodsQuantity;
    }
  }

  private getPartOfGoods(goods: Goods) {
    const partitedGoods = new Goods();
    partitedGoods.id = goods.id;
    partitedGoods.name = goods.name;
    partitedGoods.quantity = this.quantity.toString();
    partitedGoods.quantityUnit = goods.quantityUnit;
    partitedGoods.priceUnit = goods.priceUnit;
    partitedGoods.weightUnit = goods.weightUnit;
    const percent = this.quantity / Number.parseFloat(goods.quantity);
    partitedGoods.price = (percent * Number.parseFloat(goods.price)).toFixed(2).toString();
    partitedGoods.weight = (percent * Number.parseFloat(goods.weight)).toFixed(2).toString();
    return partitedGoods;
  }
}
