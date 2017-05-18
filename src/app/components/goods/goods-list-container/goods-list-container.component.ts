import {Component, OnInit, ViewChild} from '@angular/core';
import {GoodsSearchDTO} from "../goodsSearchDTO";
import {GoodsListComponent} from "../goods-list/goods-list.component";
import {statusMessages} from "../goods.module";
import {GoodsService} from "../goods.service";
import {GoodsStatusName} from "../goodsStatusName";

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
  private searchDTO:GoodsSearchDTO;
  private statusMessages = statusMessages;
  private statusNames: GoodsStatusName[];


  constructor(private goodsService:GoodsService) {
  }

  ngOnInit() {
    $("body").foundation();
    this.goodsService.getStatusNames().subscribe(
      (res) => {
        this.statusNames = res;
      },
      (err)=> {
        console.error(err);
      }
    );
  }

  private saveChanges() {
    this.goodsListComponent.doUpdate();
  }

  private doSearch() {

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
