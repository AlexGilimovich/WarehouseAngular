import {Component, OnInit, ViewChild} from '@angular/core';
import {GoodsListComponent} from "../goods-list/goods-list.component";
import {GoodsService} from "../goods.service";
import {GoodsStatusName} from "../goodsStatusName";
import {Unit} from "../unit";
import {StorageSpaceType} from "../../warehouse-scheme/storage-space-type";

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

  private statusNames:GoodsStatusName[];
  private units:Unit[];
  private storageTypes:StorageSpaceType[];

  constructor(private goodsService:GoodsService) {
  }

  ngOnInit() {
    $("body").foundation();
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

  }

  private saveChanges() {
    this.goodsListComponent.doUpdate();
  }

  private cancelChanges() {
    //todo reset changes
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
