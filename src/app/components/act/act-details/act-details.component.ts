import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
@Component({
  selector: 'app-act-details',
  templateUrl: './act-details.component.html',
  styleUrls: ['./act-details.component.scss']
})
export class ActDetailsComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }

  private back(){
    this.location.back();
  }

}
