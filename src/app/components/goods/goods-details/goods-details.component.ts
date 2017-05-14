import { Component, OnInit } from '@angular/core';
import {Goods} from "../goods";
import {GoodsService} from "../goods.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.scss']
})
export class GoodsDetailsComponent implements OnInit {
  private currentGoods:Goods;
  private id:number;


  constructor(//private warehouseService: WarehouseService,
    private goodsService:GoodsService,
    private router:Router,
    private route:ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });

  }

  ngOnInit() {

    this.goodsService.get(this.id).subscribe(
      (goods: Goods) => {
        this.currentGoods = goods;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
