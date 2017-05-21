import {Component, OnInit, Input} from "@angular/core";
import {Goods} from "../../goods/goods";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-act-goods',
  templateUrl: './act-goods.component.html',
  styleUrls: ['./act-goods.component.scss']
})
export class ActGoodsComponent implements OnInit {
  @Input() private goodsList:Goods[];

  constructor(private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit() {

  }

  private goToDetails(id) {
    this.router.navigate(['../../../goods/details', id], {relativeTo: this.route});
  }

}
