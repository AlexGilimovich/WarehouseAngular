import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Goods} from "../../goods/goods";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from "@angular/forms";



@Component({
  selector: 'app-act-goods',
  templateUrl: './act-goods.component.html',
  styleUrls: ['./act-goods.component.scss']
})
export class ActGoodsComponent implements OnInit {
  @Input() private goodsList:Goods[];
  @Input() private isEditable:boolean = false;
  @Output() private onRemoved = new EventEmitter<Goods>();
  private goodsForms:FormGroup[];

  constructor(private router:Router,
              private fb:FormBuilder,
              private route:ActivatedRoute) {

    this.goodsForms = this.goodsList.map(
      item=>{
        return this.fb.group({
          "id": [item.id, Validators.compose([Validators.required])],
          "quantity": [item.quantity, Validators.compose([Validators.required])],
          "weight": [item.weight, Validators.compose([Validators.required])],
          "price": [item.price, Validators.compose([Validators.required])],
        });
      }
    )
    
    

  }

  ngOnInit() {

  }

  private goToDetails(id) {
    this.router.navigate(['../../../goods/details', id], {relativeTo: this.route});
  }

  private remove(goods:Goods) {
    this.onRemoved.emit(goods);
  }
}
