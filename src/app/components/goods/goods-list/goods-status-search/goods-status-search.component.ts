import {Component, OnInit, Input} from '@angular/core';
import {SearchService} from "../goods-search/search.service";
import {GoodsStatusSearchDTO} from "../../goodsStatusSearchDTO";
import {GoodsStatusName} from "../../goodsStatusName";
import {statusMessages} from "../../goods.module";

@Component({
  selector: 'app-goods-status-search',
  templateUrl: './goods-status-search.component.html',
  styleUrls: ['./goods-status-search.component.scss']
})
export class GoodsStatusSearchComponent implements OnInit {
  @Input() private status:GoodsStatusSearchDTO;
  @Input() private statusNames:GoodsStatusName[];
  private statusMessages = statusMessages;
  private validationState = {from: true, to: true};

  constructor(private searchService:SearchService) {
  }

  ngOnInit() {
  }

  private removeStatus() {
    this.searchService.removeGoodsSearchStatus(this.status);
  }

  private validateFromDate(e) {
    this.validationState.from = e.target.validity.valid;
    this.generateValidationEvent();
  }

  private validateToDate(e) {
    this.validationState.to = e.target.validity.valid;
    this.generateValidationEvent();
  }

  private generateValidationEvent() {
    this.searchService.dateValidationEvent(!this.validationState.from ? this.validationState.from : (!this.validationState.to ? this.validationState.to : true));
  }


}
