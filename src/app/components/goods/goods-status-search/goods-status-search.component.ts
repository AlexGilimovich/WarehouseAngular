import { Component, OnInit, Input } from '@angular/core';
import {GoodsStatusSearchDTO} from "../goodsStatusSearchDTO";
import {GoodsStatusName} from "../goodsStatusName";
import {statusMessages} from "../goods.module";
import {SearchService} from "../goods-search/search.service";

@Component({
  selector: 'app-goods-status-search',
  templateUrl: './goods-status-search.component.html',
  styleUrls: ['./goods-status-search.component.scss']
})
export class GoodsStatusSearchComponent implements OnInit {
  @Input() private status:GoodsStatusSearchDTO;
  @Input() private statusNames:GoodsStatusName[];
  private statusMessages = statusMessages;

  constructor(private searchService:SearchService) { }

  ngOnInit() {
  }

  private removeStatus(){
    this.searchService.removeGoodsSearchStatus(this.status);
  }



}
