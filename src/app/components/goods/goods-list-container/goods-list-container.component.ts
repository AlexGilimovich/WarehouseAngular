import {Component, OnInit, ViewChild} from '@angular/core';
import {GoodsSearchDTO} from "../goodsSearchDTO";
import {GoodsListComponent} from "../goods-list/goods-list.component";
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
  private status;

  constructor() {
  }

  ngOnInit() {
    $("body").foundation();
  }

  private saveChanges() {
    //todo send changes
    this.goodsListComponent.update();
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
