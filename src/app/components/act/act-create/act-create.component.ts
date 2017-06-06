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
import {GoodsSearchDTO} from "../../goods/goodsSearchDTO";
import {InvoiceStatus} from "../../invoice/invoice-status";
import {InvoiceService} from "../../invoice/invoice.service";

@Component({
  selector: 'app-act-create',
  templateUrl: './act-create.component.html',
  styleUrls: ['./act-create.component.scss']
})
export class ActCreateComponent implements OnInit {
  private actTypeNames:ActTypeName[];
  private selectedGoodsList:Goods[] = [];
  private hasSelected:boolean;
  private user:User;
  private currentDate:Date;
  private warehouseId:string;
  private invoiceId:number;
  private goodsId:string;


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
              private invoiceService:InvoiceService,
              private router:Router,
              private route:ActivatedRoute) {

    this.actForm = this.fb.group({
      "actType": ['', Validators.compose([Validators.required])],
      "goods": new FormArray([], Validators.compose([this.goodsValidator])),
      "note": ['']
    });

    this.user = this.loginService.getLoggedUser();
    this.currentDate = new Date();

    route.params.subscribe(
      params => {
        this.warehouseId = params['id'];
      });

    route.queryParams.subscribe(
      params=> {
        debugger;
        this.invoiceId = params['invoiceId'];
        this.goodsId = params['goodsId'];
        if (this.invoiceId) {
          this.getGoodsForInvoice();
        }
      }
    );
  }

  ngOnInit() {
    this.actService.getActTypes().subscribe(
      (res) => {
        this.actTypeNames = [...res, new ActTypeName(null, '')];
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getStatusNames().subscribe(
      (res) => {
        this.statusNames = res.filter(
          item=> {
            return item.name != 'MOVED_OUT' &&
              item.name != 'STOLEN' &&
              item.name != 'SEIZED' &&
              item.name != 'TRANSPORT_COMPANY_MISMATCH' &&
              item.name != 'LOST_BY_TRANSPORT_COMPANY' &&
              item.name != 'RECYCLED' &&
              item.name != 'CHECKED' &&
              item.name != 'RELEASE_ALLOWED' &&
              item.name != 'LOST_BY_WAREHOUSE_COMPANY';
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
        this.storageTypes = [...res, new StorageSpaceType(null, '')];
      },
      (err)=> {
        console.error(err);
      }
    );
    this.goodsService.getUnits().subscribe(
      (res) => {
        this.units = [...res, new Unit(null, '')];
      },
      (err)=> {
        console.error(err);
      }
    );
  }

  private getGoodsForInvoice() {
    this.goodsService.invoiceList(this.invoiceId).subscribe(
      (res:any) => {
        this.handleResponse(res);
      },
      (err:any) => {
        console.error(err);
      }
    );
  }

  private getGoods(object) {
    this.goodsList = [];
    if (this.invoiceId) {
      this.goodsService.invoiceList(this.invoiceId).subscribe(
        (res:any) => {
          this.handleResponse(res);
        },
        (err:any) => {
          console.error(err);
        }
      );
    } else {
      let searchDTO = new GoodsSearchDTO();
      searchDTO.actApplicable = true;
      searchDTO.actType = this.actForm.get('actType').value;
      this.goodsService.search(searchDTO, this.warehouseId, object.page, object.itemsOnPage).subscribe(
        (res:any) => {
          this.handleResponse(res);
        },
        (err:any) => {
          console.error(err);
        }
      );
    }
  }

  private searchByActType() {
    if (!this.invoiceId) {
      this.goodsList = [];
      let searchDTO = new GoodsSearchDTO();
      searchDTO.actApplicable = true;
      searchDTO.actType = this.actForm.get('actType').value;
      this.goodsService.search(searchDTO, this.warehouseId, 1, 10).subscribe(
        (res:any) => {
          this.handleResponse(res);
        },
        (err:any) => {
          console.error(err);
        }
      );
    }
  }

  private search(object) {
    this.goodsList = [];
    object.searchDTO.actApplicable = true;
    object.searchDTO.actType = this.actForm.get('actType').value;
    this.goodsService.search(object.searchDTO, this.warehouseId, object.page, object.itemsOnPage).subscribe(
      (res:any) => {
        this.handleResponse(res);
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
        if (this.invoiceId) {
          this.invoiceService.updateInvoiceStatus(this.invoiceId, InvoiceStatus.CHECKED).subscribe(
            resp=> {
              debugger;
              this.location.back();
            },
            error=> {
              console.error(error);
            }
          );
        } else {
          this.location.back();
        }
      },
      error=> {
        this.location.back();
      }
    )
  }

  private selectAll():void {
    this.goodsList.forEach(
      item=> {
        this.onSelected(item);
      }
    );
  }


  private onSelected(event):void {
    if (this.isAlreadySelected(event.goods)) {
      return;
    } else {
      let newGoods = <Goods>{...event.goods};
      this.selectedGoodsList.push(newGoods);
      this.selectedGoodsList = this.selectedGoodsList.slice(0);//copy of array so in act-goods component will be detected changes
      (<FormArray>this.actForm.controls['goods']).push(new FormControl(event.goods.id));
    }
  }

  private onRemoved(goods:Goods) {
    let index = this.findIndexOfGoods(goods);
    this.selectedGoodsList.splice(index, 1);
    (<FormArray>this.actForm.controls['goods']).removeAt(index);
  }

  private isAlreadySelected(goods:Goods):boolean {
    return this.findIndexOfGoods(goods) == -1 ? false : true;
  }

  private findIndexOfGoods(goods:Goods):number {
    return this.selectedGoodsList.findIndex(
      item=> {
        return item.id == goods.id;
      }
    );
  }

  private handleResponse(res:any) {
    this.goodsList = res.goods.map(
      item=> {
        return {goods: item, selected: false, changed: false, newStatus: {}};
      });
    this.totalGoodsCount = res.count;

  }

  private goodsValidator(array:FormArray) {
    let errors:any = {};
    if (array.length == 0)
      errors.noSelectedGoods = true;

    return errors;
  }
}

