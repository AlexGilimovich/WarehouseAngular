import { Component, OnInit, Input } from '@angular/core';
import {GoodsStatusSearchDTO} from "../goodsStatusSearchDTO";
import {GoodsStatusName} from "../goodsStatusName";
import {statusMessages} from "../goods.module";

@Component({
  selector: 'app-goods-status-search',
  templateUrl: './goods-status-search.component.html',
  styleUrls: ['./goods-status-search.component.scss']
})
export class GoodsStatusSearchComponent implements OnInit {
  @Input() private status:GoodsStatusSearchDTO;
  @Input() private statusNames:GoodsStatusName[];
  private statusMessages = statusMessages;

  constructor() { }

  ngOnInit() {
  }

  private removeStatus(){
    //todo emit event to remove this.status
  }



}
