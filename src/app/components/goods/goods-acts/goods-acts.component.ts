import {Component, OnInit, Input} from '@angular/core';
import {Act} from "../../act/act";
import {actTypeMessages} from "../../act/act.module";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-goods-acts',
  templateUrl: './goods-acts.component.html',
  styleUrls: ['./goods-acts.component.scss']
})
export class GoodsActsComponent implements OnInit {
  @Input() acts:Act[];
  private actTypeMessages = actTypeMessages;

  constructor(  private router:Router,
                private route:ActivatedRoute) {
  }

  ngOnInit() {
  }

  private goToActDetails(act:Act) {
    this.router.navigate(["../../../acts/details",act.id], {relativeTo: this.route});
  }

}
