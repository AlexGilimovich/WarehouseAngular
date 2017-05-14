import { Component, OnInit } from '@angular/core';
import {GoodsStatusSearchDTO} from "../goodsStatusSearchDTO";

@Component({
  selector: 'app-goods-status-search',
  templateUrl: './goods-status-search.component.html',
  styleUrls: ['./goods-status-search.component.scss']
})
export class GoodsStatusSearchComponent implements OnInit {
  private statuses:GoodsStatusSearchDTO[];

  constructor() { }

  ngOnInit() {
  }

  private newStatus() {
    let status:GoodsStatusSearchDTO = new GoodsStatusSearchDTO();
    this.statuses.push(status);
  }

}
