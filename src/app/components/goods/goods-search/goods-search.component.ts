import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {GoodsStatusName} from "../goodsStatusName";
import {GoodsSearchDTO} from "../goodsSearchDTO";
import {Unit} from "../unit";
import {StorageSpaceType} from "../../warehouse-scheme/storage-space-type";
import {statusMessages, unitMessages, storageTypeMessages} from "../goods.module";
import {GoodsStatusSearchDTO} from "../goodsStatusSearchDTO";
import {GoodsListComponent} from "../goods-list/goods-list.component";
import {SearchService} from "./search.service";

declare var $:any;

@Component({
  selector: 'app-goods-search',
  templateUrl: './goods-search.component.html',
  styleUrls: ['./goods-search.component.scss']
})
export class GoodsSearchComponent implements OnInit {
  private statusMessages = statusMessages;
  @Input() private statusNames:GoodsStatusName[];
  @Input() private units:Unit[];
  @Input() private storageTypes:StorageSpaceType[];
  private unitMessages = unitMessages;
  private storageTypeMessages = storageTypeMessages;
  private searchDTO:GoodsSearchDTO;

  constructor(private searchService:SearchService) {
    this.searchDTO = new GoodsSearchDTO();
    this.searchDTO.statuses = [];
  }

  ngOnInit() {
    $("body").foundation();
  }

  private addStatus() {
    this.searchDTO.statuses.push(new GoodsStatusSearchDTO())
  }

  private onRemoveStatusEvent(status:GoodsStatusSearchDTO) {
    //todo
    // this.searchDTO.statuses.slice
  }

  private search() {
    this.searchService.doSearch(this.searchDTO);
  }

  private clear() {
    this.searchDTO = new GoodsSearchDTO();
    this.searchDTO.statuses = [];
  }
}
