import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarehouseSchemeService } from '../../warehouse-scheme/warehouse-scheme.service';
import { Subscription } from 'rxjs';
import { GoodsService } from '../goods.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goods-container',
  templateUrl: './goods-container.component.html',
  styleUrls: ['./goods-container.component.scss']
})
export class GoodsContainerComponent implements OnInit,OnDestroy {
  private cellsSelectedSubscription: Subscription;
  private goodsSelectedForPuttingSubscription: Subscription;
  private goodsSelectedForPutting;

  constructor(private goodsService: GoodsService,
              private router: Router,
              private route: ActivatedRoute,
              private warehouseSchemeService: WarehouseSchemeService) {

    this.goodsSelectedForPuttingSubscription = this.goodsService.selectedForPuttingGoods$.subscribe(
      res => {
        this.goodsSelectedForPutting = res;
      }
    );

    this.cellsSelectedSubscription = this.warehouseSchemeService.cartItems$.subscribe(
      cells => {
        this.goodsSelectedForPutting.cells = cells;
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
    this.goodsService.putInStorage(goods).subscribe(
      res => {
        this.router.navigate(['./details', goods.id], {relativeTo: this.route});
      },
      error=> {

      }
    );
  }

}
