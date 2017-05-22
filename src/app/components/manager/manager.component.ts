import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    $("body").foundation();
  }

}
