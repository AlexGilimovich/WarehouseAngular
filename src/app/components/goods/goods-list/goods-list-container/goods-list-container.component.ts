import {Component, OnInit, ViewChild, Input} from "@angular/core";
import {Unit} from "../../unit";
import {StorageSpaceType} from "../../../warehouse-scheme/storage-space-type";
import {GoodsListComponent} from "../list/goods-list.component";
import {GoodsStatusName} from "../../goodsStatusName";
import {GoodsService} from "../../goods.service";
import {Goods} from "../../goods";
import {LoginService} from "../../../login/login.service";

declare var $:any;

@Component({
  selector: 'app-goods-list-container',
  templateUrl: './goods-list-container.component.html',
  styleUrls: ['./goods-list-container.component.scss']
})
export class GoodsListContainerComponent implements OnInit {
  @ViewChild(GoodsListComponent)
  private goodsListComponent:GoodsListComponent;
  private hasChanged:boolean = false;
  private hasSelected:boolean = false;
  @Input() private isEditable = false;

  private goodsList:any[] = [];
  private totalGoodsCount:number;
  private statusNames:GoodsStatusName[];
  private units:Unit[];
  private storageTypes:StorageSpaceType[];
  private warehouseId;

  constructor(private goodsService:GoodsService,
              private loginService:LoginService) {
  }

  ngOnInit() {
    $("body").foundation();
    this.warehouseId = this.loginService.getLoggedUser().warehouse.idWarehouse;
    this.goodsService.getStatusNames().subscribe(
      (res) => {
        this.statusNames = res;
        this.statusNames.push(new GoodsStatusName(null, ''));
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getStorageSpaceTypes().subscribe(
      (res) => {
        this.storageTypes = res;
        let emptyType = new StorageSpaceType();
        emptyType.name = '';
        this.storageTypes.push(emptyType);
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getUnits().subscribe(
      (res) => {
        this.units = res;
        this.units.push(new Unit(null, ''));
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
      (err:any) => {
        console.error(err);
      }
    );
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
      (err:any) => {
        console.error(err);
      }
    );
  }

  private search(object) {
    this.goodsList = [];
    this.goodsService.search(object.searchDTO, this.warehouseId, object.page, object.itemsOnPage).subscribe(
      (res:any) => {
        (<Goods[]>res.goods).forEach(
          goods=> {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
        this.totalGoodsCount = res.count;
      },
      (err:any) => {
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
