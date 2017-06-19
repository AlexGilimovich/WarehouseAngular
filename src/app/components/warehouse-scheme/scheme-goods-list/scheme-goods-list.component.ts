import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../../goods/goods.service';
import { Goods } from '../../goods/goods';
import { WarehouseSchemeService } from '../warehouse-scheme.service';
import { Subscription } from 'rxjs';
import { isUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { Statuses } from '../../goods/statuses';
import {InvoiceStatus} from "../../invoice/invoice-status";
import {InvoiceService} from "../../invoice/invoice.service";

@Component({
  selector: 'app-scheme-goods-list',
  templateUrl: './scheme-goods-list.component.html',
  styleUrls: ['./scheme-goods-list.component.scss'],
  providers: [InvoiceService]
})
export class SchemeGoodsListComponent implements OnInit {
  @Input() private id_warehouse: number;
  @Input() private id_invoice: number;
  private goodsList: Goods[];
  private selectedId: string;
  private placedGoods: Goods[] = [];
  private cellsSelectedSubscription: Subscription;

  constructor(private goodsService: GoodsService,
              private warehouseSchemeService: WarehouseSchemeService,
              private invoiceService: InvoiceService,
              private route: ActivatedRoute,
              private router: Router) {
    this.cellsSelectedSubscription = this.warehouseSchemeService.deleteGoodsListSource$.subscribe((goods: Goods) => {
        this.placedGoods.push(goods);
        this.goodsList.splice(this.goodsList.indexOf(goods), 1);
        if (this.goodsList.length != 0) {
          this.selectedId = this.goodsList[0].id;
          this.warehouseSchemeService.goodsWereSelected(this.goodsList[0]);
        } else {
          this.putAllInStorage();
          this.router.navigate(['../../../../../list/incoming'], {relativeTo: this.route});
        }
      }
    );
  }

  ngOnInit() {
    this.getGoodsListFromServer();
  }

  private putAllInStorage() {
    this.placedGoods.forEach(goods => {
      /*goods.cells.forEach(cell => {
        console.log(cell.idStorageCell);
      })*/
      this.goodsService.putInStorage(goods).subscribe(res => {
          this.cellsSelectedSubscription.unsubscribe();
        },
        error => {
          console.error(error);
          this.cellsSelectedSubscription.unsubscribe();
        }
      );
    });
    const status = InvoiceStatus.COMPLETED;
    this.invoiceService.updateInvoiceStatus(this.id_invoice, status).subscribe(data => {

    });
  }

  private getGoodsListFromServer(): void {
    if (!isUndefined(this.id_invoice)) {
      this.goodsService.incomingInvoiceList(this.id_invoice).subscribe(res => {
          this.goodsList = res.goods.filter((item: Goods) => {
            return item.currentStatus.name === Statuses.CHECKED();
          });
          if (this.goodsList.length !== 0) {
            this.selectedId = this.goodsList[0].id;
            this.warehouseSchemeService.goodsWereSelected(this.goodsList[0]);
          }
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
