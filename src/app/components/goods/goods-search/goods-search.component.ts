import { Component, OnInit, Input } from '@angular/core';
import {statusMessages} from "../goods.module";
import {GoodsStatusName} from "../goodsStatusName";
import {GoodsSearchDTO} from "../goodsSearchDTO";

declare var $:any;

@Component({
  selector: 'app-goods-search',
  templateUrl: './goods-search.component.html',
  styleUrls: ['./goods-search.component.scss']
})
export class GoodsSearchComponent implements OnInit {
  private statusMessages = statusMessages;
  @Input() private statusNames:GoodsStatusName[];
  private searchDTO:GoodsSearchDTO;

  constructor() {
    this.searchDTO = new GoodsSearchDTO();
    this.searchDTO.statuses = []
  }

  ngOnInit() {
    $("body").foundation();
    
  }

  // private newStatus() {
  //   let status:GoodsStatusSearchDTO = new GoodsStatusSearchDTO();
  //   this.statuses.push(status);
  // }
}
