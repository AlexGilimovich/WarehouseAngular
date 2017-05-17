import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-goods-search',
  templateUrl: './goods-search.component.html',
  styleUrls: ['./goods-search.component.scss']
})
export class GoodsSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("body").foundation();
  }

}
