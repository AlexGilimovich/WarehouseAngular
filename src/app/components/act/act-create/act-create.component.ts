import {Component, OnInit, ViewChild} from "@angular/core";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from "@angular/forms";
import {ActService} from "../act.service";
import {ActTypeName} from "../actTypeName";
import {actTypeMessages} from "../act.module";
import {ActDTO} from "../ActDTO";
import {GoodsStatusName} from "../../goods/goodsStatusName";
import {GoodsService} from "../../goods/goods.service";
import {StorageSpaceType} from "../../warehouse-scheme/storage-space-type";
import {Unit} from "../../goods/unit";
import {GoodsListComponent} from "../../goods/goods-list/list/goods-list.component";
import {Goods} from "../../goods/goods";
import {User} from "../../user/user";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-act-create',
  templateUrl: './act-create.component.html',
  styleUrls: ['./act-create.component.scss']
})
export class ActCreateComponent implements OnInit {
  private actTypeNames:ActTypeName[];
  private goodsList:Goods[] = [];
  private selectedIdList:string[] = [];
  private hasSelected:boolean;
  private user:User;
  private currentDate:Date;

  private statusNames:GoodsStatusName[];
  private storageTypes:StorageSpaceType[];
  private units:Unit[];
  @ViewChild(GoodsListComponent)
  private goodsListComponent:GoodsListComponent;

  private actTypeMessages = actTypeMessages;
  private actForm:FormGroup;

  constructor(private actService:ActService,
              private location:Location,
              private fb:FormBuilder,
              private goodsService:GoodsService,
              private loginService:LoginService) {
    this.actForm = this.fb.group({
      "actType": ['', Validators.compose([Validators.required])],
      "goods": new FormArray([], Validators.compose([goodsValidator]))
    });
    this.user = this.loginService.getLoggedUser();
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.actService.getActTypes().subscribe(
      (res) => {
        this.actTypeNames = res;
        this.actTypeNames.push(new ActTypeName(null, ''));
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
  }

  private close() {
    this.location.back();
  }

  private save() {
    let act:ActDTO = new ActDTO();
    act.type = this.actForm.controls['actType'].value;
    act.goodsList = this.goodsList;

    this.actService.save(act).subscribe(
      res=> {
        this.location.back();
      },
      error=> {
        this.location.back();
      }
    )
  }

  private addGoods() {
    let selectedGoods:Goods[] = this.goodsListComponent.getSelectedGoods().filter(
      item=> {
        return !this.isAlreadySelected(item.id);
      }
    ).map(
      item=> {
        let goods = new Goods();
        goods.id = item.id;
        goods.name = item.name;
        goods.quantity = item.quantity;
        goods.quantityUnit = item.quantityUnit;
        goods.weight = item.weight;
        goods.weightUnit = item.weightUnit;
        goods.price = item.price;
        goods.priceUnit = item.priceUnit;
        goods.storageType = item.storageType;
        return goods;
      }
    );
    this.goodsList = this.goodsList.concat(selectedGoods);
    selectedGoods.forEach(
      (item, index)=> {
        (<FormArray>this.actForm.controls['goods']).insert(index, new FormControl(item.id));
        this.selectedIdList.push(item.id);
      }
    )
  }

  private isAlreadySelected(goods) {
    return this.selectedIdList.includes(goods);
  }

  private onSelected(event) {
    this.hasSelected = event;

  }

  private onRemoved(goods:Goods) {
    this.goodsList.splice(this.goodsList.findIndex(
      item=> {
        return item.id == goods.id;
      }
    ), 1);
    let index = this.selectedIdList.findIndex(
      item=> {
        return item == goods.id;
      }
    );
    this.selectedIdList.splice(index, 1);
    (<FormArray>this.actForm.controls['goods']).removeAt(index);


  }


}
function goodsValidator(array:FormArray) {
  let errors:any = {};

  if (array.length == 0)
    errors.noSelectedGoods = true;

  return errors;
}
