import {Component, OnInit} from "@angular/core";
import {Goods} from "../goods";
import {GoodsService} from "../goods.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GoodsStatusName} from "../goodsStatusName";
import {Unit} from "../unit";
import {StorageSpaceType} from "../../warehouse-scheme/storage-space-type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {statusMessages} from "../goods.module";
import {GoodsStatus} from "../goodsStatus";
import {Act} from "../../act/act";
import {ActService} from "../../act/act.service";

@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.scss']
})
export class GoodsDetailsComponent implements OnInit {
  private goods:Goods;
  private statuses:GoodsStatus[];
  private acts:Act[];
  private id:number;
  private statusNames:GoodsStatusName[];
  private units:Unit[];
  private storageTypes:StorageSpaceType[];
  private goodsForm:FormGroup;
  private hasRights:boolean = true;//todo check
  private statusMessages = statusMessages;

  constructor(private goodsService:GoodsService,
              private actService:ActService,
              private router:Router,
              private fb:FormBuilder,
              private route:ActivatedRoute) {
    route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.goodsForm = this.fb.group({
      "name": [{
        value: '',
        disabled: !this.hasRights
      }, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\s]*$/)])],
      "quantity": [{value: '', disabled: !this.hasRights}, ],
      "quantityUnit": [{value: '', disabled: !this.hasRights}],
      "weight": [{value: '', disabled: !this.hasRights},],
      "weightUnit": [{value: '', disabled: !this.hasRights}],
      "price": [{value: '', disabled: !this.hasRights},],
      "priceUnit": [{value: '', disabled: !this.hasRights},],
      "storageType": [{value: '', disabled: !this.hasRights},],
      "currentStatus": [{value: '', disabled: !this.hasRights},],
    });


  }

  ngOnInit() {
    this.goodsService.get(this.id).subscribe(
      (goods:Goods) => {
        this.goods = goods;
        this.fillForm();
        this.goodsService.getStatusesForGoods(this.goods.id).subscribe(
          (statuses) => {
            this.statuses = statuses;
          },
          (err)=> {
            console.error(err);
          }
        );
        this.actService.getActsForGoods(this.goods.id).subscribe(
          (acts) => {
            this.acts = acts;
          },
          (err)=> {
            console.error(err);
          }
        );
      },
      (err:any) => {
        console.log(err);
      }
    );
    this.goodsService.getStorageSpaceTypes().subscribe(
      (res) => {
        this.storageTypes = res;
        let emptyType = new StorageSpaceType();
        emptyType.name = '';
        this.storageTypes.push(emptyType);
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getUnits().subscribe(
      (res) => {
        this.units = res;
        this.units.push(new Unit(null, ''));
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getStatusNames().subscribe(
      (res) => {
        this.statusNames = res;
        this.statusNames.push(new GoodsStatusName(null, ''));
      },
      (err)=> {
        console.error(err);
      }
    );


  }

  private fillForm():void {
    this.goodsForm.controls['name'].setValue(this.goods.name);
    this.goodsForm.controls['quantity'].setValue(this.goods.quantity);
    this.goodsForm.controls['quantityUnit'].setValue(this.goods.quantityUnit.name);
    this.goodsForm.controls['weight'].setValue(this.goods.weight);
    this.goodsForm.controls['weightUnit'].setValue(this.goods.weightUnit.name);
    this.goodsForm.controls['price'].setValue(this.goods.price);
    this.goodsForm.controls['priceUnit'].setValue(this.goods.priceUnit.name);
    this.goodsForm.controls['storageType'].setValue(this.goods.storageType.name);
    this.goodsForm.controls['currentStatus'].setValue(this.goods.status.name);

  }

}
