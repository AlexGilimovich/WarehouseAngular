import {Component, OnInit, ViewChild} from "@angular/core";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ActService} from "../act.service";
import {ActTypeName} from "../actTypeName";
import {actTypeMessages} from "../act.module";
import {GoodsStatusName} from "../../goods/goodsStatusName";
import {GoodsService} from "../../goods/goods.service";
import {StorageSpaceType} from "../../warehouse-scheme/storage-space-type";
import {Unit} from "../../goods/unit";
import {GoodsListComponent} from "../../goods/goods-list/list/goods-list.component";
import {Goods} from "../../goods/goods";
import {User} from "../../user/user";
import {LoginService} from "../../login/login.service";
import {Act} from "../act";

@Component({
  selector: 'app-act-create',
  templateUrl: './act-create.component.html',
  styleUrls: ['./act-create.component.scss']
})
export class ActCreateComponent implements OnInit {
  private actTypeNames:ActTypeName[];
  private selectedGoodsList:Goods[] = [];
  private selectedIdList:string[] = [];
  private hasSelected:boolean;
  private user:User;
  private currentDate:Date;
  private warehouseId:string; //todo

  private goodsList:any[] = [];
  private totalGoodsCount:number;

  private statusNames:GoodsStatusName[] = [];
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
              private loginService:LoginService,
              private router:Router,
              private route:ActivatedRoute) {
    this.actForm = this.fb.group({
      "actType": ['', Validators.compose([Validators.required])],
      "goods": new FormArray([], Validators.compose([goodsValidator])),
      "note": ['']
    });
    this.user = this.loginService.getLoggedUser();
    this.currentDate = new Date();

    route.params.subscribe(params => {
      this.warehouseId = params['id'];
    });
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
        res.forEach(
          item=> {
            if (item.name != 'MOVED_OUT' &&
              item.name != 'STOLEN' &&
              item.name != 'SEIZED' &&
              item.name != 'TRANSPORT_COMPANY_MISMATCH' &&
              item.name != 'LOST_BY_TRANSPORT_COMPANY' &&
              item.name != 'RECYCLED' &&
              item.name != 'CHECKED' &&
              item.name != 'RELEASE_ALLOWED' &&
              item.name != 'LOST_BY_WAREHOUSE_COMPANY') {
              this.statusNames.push(item);
            }
          }
        );


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
    this.goodsService.actApplicableList(this.warehouseId, 1, 10).subscribe(
      (res) => {
        res.goods.forEach(
          goods => {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
        this.totalGoodsCount = res.count;
      },
      (err:any) => {
        console.error(err);
      }
    );
  }


  private getGoods(object) {
    this.goodsList = [];
    this.goodsService.actApplicableList(this.warehouseId, object.page, object.itemsOnPage).subscribe(
      (res) => {
        res.goods.forEach(
          goods=> {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
        this.totalGoodsCount = res.count;
      },
      (err:any) => {
        console.error(err);
      }
    );
  }

  private search(object) {
    this.goodsList = [];
    object.searchDTO.actApplicable = true;
    this.goodsService.search(object.searchDTO, this.warehouseId, object.page, object.itemsOnPage).subscribe(
      (res:any) => {
        (<Goods[]>res.goods).forEach(
          goods=> {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
        this.totalGoodsCount = res.count;
      },
      (err:any) => {
        console.error(err);
      }
    );
  }

  private close() {
    this.location.back();
  }

  private save() {
    let act:Act = new Act();
    act.type = this.actForm.controls['actType'].value;
    act.goodsList = this.selectedGoodsList;
    act.note = this.actForm.controls['note'].value;
    act.warehouseId = this.warehouseId;

    this.actService.save(act).subscribe(
      res=> {
        this.location.back();
      },
      error=> {
        this.location.back();
      }
    )
  }

  // private addGoods() {
  //   let selectedGoods:Goods[] = this.goodsListComponent.getSelectedGoods().filter(
  //     item=> {
  //       return !this.isAlreadySelected(item.id);
  //     }
  //   ).map(
  //     item=> {
  //       let goods = new Goods();
  //       goods.id = item.id;
  //       goods.name = item.name;
  //       goods.quantity = item.quantity;
  //       goods.quantityUnit = item.quantityUnit;
  //       goods.weight = item.weight;
  //       goods.weightUnit = item.weightUnit;
  //       goods.price = item.price;
  //       goods.priceUnit = item.priceUnit;
  //       goods.storageType = item.storageType;
  //       return goods;
  //     }
  //   );
  //   this.selectedGoodsList = this.selectedGoodsList.concat(selectedGoods);
  //   selectedGoods.forEach(
  //     (item, index)=> {
  //       (<FormArray>this.actForm.controls['goods']).insert(index, new FormControl(item.id));
  //       this.selectedIdList.push(item.id);
  //     }
  //   )
  // }

  private isAlreadySelected(goods) {
    return this.selectedIdList.includes(goods);
  }

  private onSelected(event) {
    // this.hasSelected = event;
    if (this.isAlreadySelected(event.goods.id)) {
      return;
    } else {
      let newGoods = <Goods>{...event.goods};
      this.selectedGoodsList.push(newGoods);
      this.selectedGoodsList = this.selectedGoodsList.slice(0);//copy of array so in act-goods component will be detected changes
      (<FormArray>this.actForm.controls['goods']).push(new FormControl(event.goods.id));
      this.selectedIdList.push(event.goods.id);
    }
  }

  private onRemoved(goods:Goods) {
    this.selectedGoodsList.splice(this.selectedGoodsList.findIndex(
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
