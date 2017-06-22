import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Goods } from '../../goods/goods';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-act-goods',
  templateUrl: './act-goods.component.html',
  styleUrls: ['./act-goods.component.scss']
})
export class ActGoodsComponent implements OnInit, OnChanges {
  @Input() private goodsList: Goods[];
  @Input() private isEditable = false;
  @Output() private onRemoved = new EventEmitter<Goods>();
  private goodsInitialState = [];

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.goodsList) {
      this.goodsInitialState = this.goodsList.map(item => {
          return {
            quantity: item.quantity,
            weight: item.weight,
            price: item.price
          };
        }
      );
    }
  }

  private goToDetails(id) {
    this.router.navigate(['../../../goods/details', id], {relativeTo: this.route});
  }

  private remove(goods: Goods) {
    this.onRemoved.emit(goods);
  }

  private limitValue(input: any, index: number): void {
    const initialQuantity = this.goodsInitialState[index].quantity;
    const initialPrice = this.goodsInitialState[index].price;
    const initialWeight = this.goodsInitialState[index].weight;

    if (input.value > initialQuantity) {
      input.value = initialQuantity;
      this.goodsList[index].quantity = initialQuantity;
    }
    if (input.value == this.goodsInitialState[index].quantity) {
      this.goodsList[index].weight = initialWeight;
      this.goodsList[index].price = initialPrice;
    } else {
      this.goodsList[index].weight = this.round(input.value / initialQuantity * initialWeight, 3).toString();
      this.goodsList[index].price = this.round(input.value / initialQuantity * initialPrice, 2).toString();
    }
  }

  private  round(value: number, precision: number): number {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}
