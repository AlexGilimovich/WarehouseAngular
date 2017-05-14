import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.scss']
})
export class DispatcherComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    $("body").foundation();
  }

}
