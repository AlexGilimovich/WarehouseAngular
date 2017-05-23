import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import {Goods} from "../../goods/goods";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-act-goods',
  templateUrl: './act-goods.component.html',
  styleUrls: ['./act-goods.component.scss']
})
export class ActGoodsComponent implements OnInit, OnChanges {
  @Input() private goodsList:Goods[];
  @Input() private isEditable:boolean = false;
  @Output() private onRemoved = new EventEmitter<Goods>();
  private goodsInitialState = [];

  constructor(private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.goodsList)
      this.goodsInitialState = this.goodsList.map(
        item=> {
          return {
            quantity: item.quantity,
            weight: item.weight,
            price: item.price
          }
        }
      )
  }


  private goToDetails(id) {
    this.router.navigate(['../../../goods/details', id], {relativeTo: this.route});
  }

  private remove(goods:Goods) {
    this.onRemoved.emit(goods);
  }

  private limitValue(event, index:number, field:string) {
    switch (field) {
      case "quantity":
        event.target.value > this.goodsInitialState[index].quantity ? event.target.value = this.goodsInitialState[index].quantity : event.target.value;
        if (event.target.value == this.goodsInitialState[index].quantity) {
          this.goodsList[index].weight = this.goodsInitialState[index].weight;
          this.goodsList[index].price = this.goodsInitialState[index].price;
        } else {
          this.goodsList[index].weight = this.round(event.target.value / this.goodsInitialState[index].quantity* this.goodsInitialState[index].weight,3).toString();
          this.goodsList[index].price = this.round(event.target.value / this.goodsInitialState[index].quantity* this.goodsInitialState[index].price,2).toString();
        }
        break;
      // case "weight":
      //   event.target.value > this.goodsInitialState[index].weight ? event.target.value = this.goodsInitialState[index].weight : event.target.value;
      //   break;
      // case "price":
      //   event.target.value > this.goodsInitialState[index].price ? event.target.value = this.goodsInitialState[index].price : event.target.value;
      //   break;
      default:
        break;

    }
  }

  private  round(value:number, precision:number):number {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}
