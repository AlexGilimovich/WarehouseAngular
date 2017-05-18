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
  private status:GoodsStatusSearchDTO = new GoodsStatusSearchDTO();
  private statusMessages = statusMessages;
  @Input() private statusNames:GoodsStatusName[];

  constructor() { }

  ngOnInit() {
  }



}
