import { Component, OnInit, Input } from '@angular/core';
import {GoodsStatus} from "../goodsStatus";
import {statusMessages} from "../goods.module";

@Component({
  selector: 'app-status-history',
  templateUrl: './status-history.component.html',
  styleUrls: ['./status-history.component.scss']
})
export class StatusHistoryComponent implements OnInit {
  @Input() statuses: GoodsStatus[];
  private statusMessages = statusMessages;
  constructor() { }

  ngOnInit() {
  }

}
