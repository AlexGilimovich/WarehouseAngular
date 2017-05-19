import { Component, OnInit,Input } from '@angular/core';
import {Act} from "../../act/act";
import {actTypeMessages} from "../../act/act.module";

@Component({
  selector: 'app-goods-acts',
  templateUrl: './goods-acts.component.html',
  styleUrls: ['./goods-acts.component.scss']
})
export class GoodsActsComponent implements OnInit {
  @Input() acts: Act[];
  private actTypeMessages = actTypeMessages;
  constructor() { }

  ngOnInit() {
  }

}
