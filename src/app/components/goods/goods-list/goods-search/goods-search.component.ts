import {Component, OnInit, Input } from "@angular/core";
import {DatePipe} from "@angular/common";

import {SearchService} from "./search.service";
import {Subscription} from "rxjs";
import {GoodsStatusName} from "../../goodsStatusName";
import {Unit} from "../../unit";
import {StorageSpaceType} from "../../../warehouse-scheme/storage-space-type";
import {GoodsSearchDTO} from "../../goodsSearchDTO";
import {unitMessages, storageTypeMessages, statusMessages} from "../../goods.module";
import {GoodsStatusSearchDTO} from "../../goodsStatusSearchDTO";
import {IncomingInvoice} from "../../../invoice/incoming-invoice/incoming-invoice";
import {OutgoingInvoice} from "../../../invoice/outgoing-invoice/outgoing-invoice";
import {InvoiceService} from "../../../invoice/invoice.service";

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
  @Input() private statusSearcheable:boolean = true;
  private unitMessages = unitMessages;
  private storageTypeMessages = storageTypeMessages;
  private searchDTO:GoodsSearchDTO;
  private subscription:Subscription;
  private subscriptionValidation:Subscription;
  private isValid:boolean = true;
  private incomingInvoices:IncomingInvoice[] = [];
  private outgoingInvoices:OutgoingInvoice[] = [];

  constructor(private searchService:SearchService,
              private invoiceService:InvoiceService) {
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
    this.invoiceService.getAllIncoming().subscribe(
      res=> {
        this.incomingInvoices = res;
      }
    );
    this.invoiceService.getAllOutgoing().subscribe(
      res=> {
        this.outgoingInvoices = res;
      }
    );
  }

  private addStatus() {
    this.searchDTO.statuses.push(new GoodsStatusSearchDTO())
  }

  private removeStatus(status:GoodsStatusSearchDTO) {
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
