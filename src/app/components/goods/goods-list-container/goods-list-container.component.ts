import { Component, OnInit } from '@angular/core';
import {GoodsSearchDTO} from "../goodsSearchDTO";

@Component({
  selector: 'app-goods-list-container',
  templateUrl: './goods-list-container.component.html',
  styleUrls: ['./goods-list-container.component.scss']
})
export class GoodsListContainerComponent implements OnInit {
  private isChanged:boolean = false;
  private searchDTO:GoodsSearchDTO;

  constructor() {
  }

  ngOnInit() {
  }

  private saveChanges() {
    //todo send changes
  }

  private doSearch() {

  }


}
