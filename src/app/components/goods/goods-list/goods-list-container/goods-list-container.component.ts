import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Unit } from '../../unit';
import { StorageSpaceType } from '../../../warehouse-scheme/storage-space-type';
import { GoodsListComponent } from '../list/goods-list.component';
import { GoodsStatusName } from '../../goodsStatusName';
import { GoodsService } from '../../goods.service';
import { Goods } from '../../goods';
import { LoginService } from '../../../login/login.service';
import { statusMessages } from '../../goods.module';

declare var $: any;

@Component({
  selector: 'app-goods-list-container',
  templateUrl: './goods-list-container.component.html',
  styleUrls: ['./goods-list-container.component.scss']
})
export class GoodsListContainerComponent implements OnInit {
  @ViewChild(GoodsListComponent)
  private goodsListComponent: GoodsListComponent;
  private hasChanged: boolean = false;
  private hasSelected: boolean = false;
  @Input() private isEditable = false;

  private completeGoodsList: Goods[] = [];
  public isDataAvailable: boolean = false;
  public pieChartLabelsTypeStorage: string[] = [];
  public pieChartDataTypeStorage: number[] = [];
  public pieChartType: string = 'doughnut';
  public ChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartLabelsStatus: string[] = [];
  private barChartDataStatus: number[] = [];
  public barChartData: any[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartOptions: any = {
    hover: {animationDuration: 0},
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    scaleShowValues: true,
    responsive: true
  };

  private goodsList: any[] = [];
  private totalGoodsCount: number;
  private statusNames: GoodsStatusName[];
  private quantityUnits: Unit[];
  private priceUnits: Unit[];
  private weightUnits: Unit[];

  private storageTypes: StorageSpaceType[];
  private warehouseId;

  constructor(private goodsService: GoodsService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.initFoundation();
    this.warehouseId = this.loginService.getLoggedUser().warehouse.idWarehouse;
    this.goodsService.getStatusNames().subscribe(
      (res) => {
        this.statusNames = res;
        for (let i = 0; i < this.statusNames.length; i++) {
          this.barChartLabelsStatus.push(statusMessages.get(this.statusNames[i].name));
        }
        this.statusNames.push(new GoodsStatusName(null, ''));
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getStorageSpaceTypes().subscribe(
      (res) => {
        this.storageTypes = res;
        for (let i = 0; i < this.storageTypes.length; i++) {
          this.pieChartLabelsTypeStorage.push(this.storageTypes[i].name);
        }
        let emptyType = new StorageSpaceType();
        emptyType.name = '';
        this.storageTypes.push(emptyType);
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getQuantityUnits().subscribe(
      (res) => {
        this.quantityUnits = [...res, new Unit(null, '')];
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getPriceUnits().subscribe(
      (res) => {
        this.priceUnits = [...res, new Unit(null, '')];
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getWeightUnits().subscribe(
      (res) => {
        this.weightUnits = [...res, new Unit(null, '')];
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.list(this.warehouseId, 1, 10).subscribe(
      (res) => {
        res.goods.forEach(
          goods => {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
        this.totalGoodsCount = res.count;
      },
      (err: any) => {
        console.error(err);
      }
    );
    this.goodsService.list(this.warehouseId, -1, -1).subscribe(data => {
      data.goods.forEach(
        goods => {
          this.completeGoodsList.push(goods);
        }
      );
      this.initCharts();
    });
  }

  private initFoundation(): void {
    $('#accordion').foundation();
  }

  private initCharts() {
    for (let j = 0; j < this.pieChartLabelsTypeStorage.length; j++) {
      this.pieChartDataTypeStorage[j] = 0;
    }
    for (let k = 0; k < this.barChartLabelsStatus.length; k++) {
      this.barChartDataStatus[k] = 0;
    }

    for (let i = 0; i < this.completeGoodsList.length; i++) {
      for (let j = 0; j < this.pieChartLabelsTypeStorage.length; j++) {
        if (this.completeGoodsList[i].storageType.name == this.pieChartLabelsTypeStorage[j]) {
          this.pieChartDataTypeStorage[j]++;
          break;
        }
      }
      for (let k = 0; k < this.barChartLabelsStatus.length; k++) {
        if (statusMessages.get(this.completeGoodsList[i].currentStatus.name) == this.barChartLabelsStatus[k]) {
          this.barChartDataStatus[k]++;
          break;
        }
      }
    }
    this.barChartData.push(
      {
        data: this.barChartDataStatus,
        label: 'Товаров'
      });

    this.isDataAvailable = true;
    console.log(this.barChartLabelsStatus);
    console.log(this.pieChartLabelsTypeStorage);
    console.log(this.barChartDataStatus + ", " + this.pieChartDataTypeStorage);
  }

  private getGoods(object) {
    this.goodsList = [];
    this.goodsService.list(this.warehouseId, object.page, object.itemsOnPage).subscribe(
      (res) => {
        res.goods.forEach(
          goods=> {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
        this.totalGoodsCount = res.count;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  private search(object) {
    this.goodsList = [];
    this.goodsService.search(object.searchDTO, this.warehouseId, object.page, object.itemsOnPage).subscribe(
      (res: any) => {
        (<Goods[]>res.goods).forEach(
          goods=> {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
        this.totalGoodsCount = res.count;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  private saveChanges() {
    this.goodsListComponent.doUpdate();
  }

  private cancelChanges() {
    this.goodsListComponent.cancelChanges();
  }


  private onChanged(event) {
    this.hasChanged = event;
  }

  private onSelected(event) {
    this.hasSelected = event;
  }

  private batchStatusUpdate() {
    this.goodsListComponent.openStatusModal();
  }


}
