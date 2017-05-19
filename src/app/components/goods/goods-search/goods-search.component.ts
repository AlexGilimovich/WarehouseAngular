import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {GoodsStatusName} from "../goodsStatusName";
import {GoodsSearchDTO} from "../goodsSearchDTO";
import {Unit} from "../unit";
import {StorageSpaceType} from "../../warehouse-scheme/storage-space-type";
import {statusMessages, unitMessages, storageTypeMessages} from "../goods.module";
import {GoodsStatusSearchDTO} from "../goodsStatusSearchDTO";
import {GoodsListComponent} from "../goods-list/goods-list.component";
import {SearchService} from "./search.service";
import {Subscription} from "rxjs";

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
  private subscription:Subscription;
  private subscriptionValidation:Subscription;
  private isValid: boolean = true;

  constructor(private searchService:SearchService) {
    this.searchDTO = new GoodsSearchDTO();
    this.searchDTO.statuses = [];
    this.subscription = searchService.removeStatusEvent$.subscribe(
      status => {
        this.removeStatus(status);
      });

    this.subscriptionValidation = searchService.dateValidationEvent$.subscribe(
      (validity:boolean) => {
        this.isValid = validity;
      });


  }

  ngOnInit() {
    $("body").foundation();
  }

  private addStatus() {
    this.searchDTO.statuses.push(new GoodsStatusSearchDTO())
  }

  private removeStatus(status:GoodsStatusSearchDTO) {
    //todo

    this.searchDTO.statuses.splice(this.searchDTO.statuses.findIndex(
      predicate=> {
        return predicate == status;
      }
    ), 1);


  }

  private search() {
    this.searchService.doSearch(this.searchDTO);
  }

  private clear() {
    this.searchDTO = new GoodsSearchDTO();
    this.searchDTO.statuses = [];
    this.searchService.doSearch(this.searchDTO);
  }
}
