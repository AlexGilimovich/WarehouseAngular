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
import {StorageType} from "../storageType";
import {StorageCell} from "../../warehouse-scheme/storage-cell";
import {Location} from "@angular/common";
import {WarehouseService} from "../../warehouse/warehouse.service";

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
  private statusNames:GoodsStatusName[] = [];
  private units:Unit[];
  private storageTypes:StorageSpaceType[];
  private goodsForm:FormGroup;
  private hasRights:boolean = true;//todo check
  private statusMessages = statusMessages;
  private warehouseId;
  private isEditable:boolean = true;

  private cells:StorageCell[] = [];

  constructor(private goodsService:GoodsService,
              private actService:ActService,
              private router:Router,
              private location:Location,
              private fb:FormBuilder,
              private warehouseService:WarehouseService,
              private route:ActivatedRoute) {
    route.params.subscribe(params => {
      this.id = params['id'];
      // this.warehouseId = params['warehouseId'];

    });
    route.queryParams.subscribe(params => {
      this.warehouseId = params['warehouseId'];

    });

    this.goodsForm = this.fb.group({
      "name": [{
        value: '',
        disabled: !this.hasRights
      }, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\s\d]*$/)])],
      "quantity": [{value: '', disabled: !this.hasRights}, Validators.compose([Validators.required])],
      "quantityUnit": [{value: '', disabled: !this.hasRights}, Validators.compose([Validators.required])],
      "weight": [{value: '', disabled: !this.hasRights}, Validators.compose([Validators.required])],
      "weightUnit": [{value: '', disabled: !this.hasRights}, Validators.compose([Validators.required])],
      "price": [{value: '', disabled: !this.hasRights}, Validators.compose([Validators.required])],
      "priceUnit": [{value: '', disabled: !this.hasRights}, Validators.compose([Validators.required])],
      "storageType": [{value: '', disabled: !this.hasRights}, Validators.compose([Validators.required])],
      "currentStatus": [{value: '', disabled: !this.hasRights}, Validators.compose([Validators.required])],
    });


  }

  ngOnInit() {
    this.goodsService.get(this.id).subscribe(
      (goods:Goods) => {
        this.goods = goods;
        this.cells = goods.cells;
        this.fillForm(this.checkIfEditable(goods));
        this.goodsService.getStatusesForGoods(this.goods.id).subscribe(
          (statuses) => {
            this.statuses = statuses.sort((current, next)=> {
              return (new Date(current.date) > new Date(next.date)) ? 1 : -1;
            });
          },
          (err)=> {
            console.error(err);
          }
        );
        this.actService.getActsForGoods(this.goods.id).subscribe(
          (acts) => {
            this.acts = acts.sort((current, next)=> {
              return (new Date(current.date) > new Date(next.date)) ? 1 : -1;
            });
          },
          (err)=> {
            console.error(err);
          }
        );
        this.goodsService.getStatusNames().subscribe(
          (res) => {
            this.statusNames = this.filterStatusNames(res);
            this.statusNames.push(new GoodsStatusName(null, ''));
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

  }

  private checkIfEditable(goods:Goods):boolean {
    return !(goods.currentStatus.name == 'MOVED_OUT' ||
      goods.currentStatus.name == 'STOLEN' ||
      goods.currentStatus.name == 'SEIZED' ||
      goods.currentStatus.name == 'TRANSPORT_COMPANY_MISMATCH' ||
      goods.currentStatus.name == 'RECYCLED' ||
      goods.currentStatus.name == 'LOST_BY_TRANSPORT_COMPANY' ||
      goods.currentStatus.name == 'LOST_BY_WAREHOUSE_COMPANY'
    );
  }

  private filterStatusNames(statusNames:GoodsStatusName[]):GoodsStatusName[] {

    switch (this.goods.currentStatus.name) {
      case 'REGISTERED':
        return statusNames.filter(item=> {
          return item.name == 'REGISTERED' || item.name == 'CHECKED' || item.name == 'TRANSPORT_COMPANY_MISMATCH' || item.name == 'LOST_BY_TRANSPORT_COMPANY'
        });
      case 'CHECKED':
        return statusNames.filter(item=> {
          return item.name == 'CHECKED' || item.name == 'STORED'
        });
      case 'STORED':
        return statusNames.filter(item=> {
          return item.name == 'STORED' || item.name == 'WITHDRAWN'
          // return item.name != 'CHECKED' && item.name != 'REGISTERED' && item.name != 'RELEASE_ALLOWED' && item.name != 'MOVED_OUT' && item.name != 'LOST_BY_TRANSPORT_COMPANY' && item.name != 'TRANSPORT_COMPANY_MISMATCH'
        });
      case 'STOLEN':
        return statusNames.filter(item=> {
          return item.name == 'STOLEN'
        });
      case 'SEIZED':
        return statusNames.filter(item=> {
          return item.name == 'SEIZED'
        });
      case 'TRANSPORT_COMPANY_MISMATCH':
        return statusNames.filter(item=> {
          return item.name == 'TRANSPORT_COMPANY_MISMATCH'
        });
      case 'LOST_BY_TRANSPORT_COMPANY':
        return statusNames.filter(item=> {
          return item.name == 'LOST_BY_TRANSPORT_COMPANY'
        });
      case 'LOST_BY_WAREHOUSE_COMPANY':
        return statusNames.filter(item=> {
          return item.name == 'LOST_BY_WAREHOUSE_COMPANY'
        });
      case 'RECYCLED':
        return statusNames.filter(item=> {
          return item.name == 'RECYCLED'
        });
      case 'WITHDRAWN':
        return statusNames.filter(item=> {
          return item.name == 'WITHDRAWN' || item.name == 'STORED'|| item.name == 'RELEASE_ALLOWED'
          // return item.name != 'REGISTERED' && item.name != 'CHECKED' && item.name != 'TRANSPORT_COMPANY_MISMATCH' && item.name != 'LOST_BY_TRANSPORT_COMPANY' && item.name != 'MOVED_OUT'
        });
      case 'RELEASE_ALLOWED':
        return statusNames.filter(item=> {
          return item.name == 'RELEASE_ALLOWED' || item.name == 'MOVED_OUT' || item.name == 'STORED'
        });
      case 'MOVED_OUT':
        return statusNames.filter(item=> {
          return item.name == 'MOVED_OUT'
        });
      default:
        break;
    }

  }


  private goToStorageView() {
    this.goodsService.selectedForPuttingGoodsSource.next(this.goods);
    this.router.navigate(['../../typespace', this.goods.storageType.id, 'warehouse', this.warehouseId, 'put'], {relativeTo: this.route});

  }


  private removeFromStorage() {
    this.goodsService.removeFromStorage(this.goods).subscribe(
      res=> {
        this.goodsService.get(this.id).subscribe(
          (goods:Goods) => {
            this.goods = goods;
            this.cells = goods.cells;
            this.fillForm(this.checkIfEditable(goods));
            this.goodsService.getStatusesForGoods(this.goods.id).subscribe(
              (statuses) => {
                this.statuses = statuses.sort((current, next)=> {
                  return (new Date(current.date) > new Date(next.date)) ? 1 : -1;
                });

              },
              (err)=> {
                console.error(err);
              }
            );
            this.actService.getActsForGoods(this.goods.id).subscribe(
              (acts) => {
                this.acts = acts.sort((current, next)=> {
                  return (new Date(current.date) > new Date(next.date)) ? 1 : -1;
                });
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
      }
    )

  }

  private fillForm(isEditable:boolean):void {
    this.isEditable = isEditable;
    this.goodsForm.controls['name'].setValue(this.goods.name);
    this.goodsForm.controls['quantity'].setValue(this.goods.quantity);
    this.goodsForm.controls['quantityUnit'].setValue(this.goods.quantityUnit.name);
    this.goodsForm.controls['weight'].setValue(this.goods.weight);
    this.goodsForm.controls['weightUnit'].setValue(this.goods.weightUnit.name);
    this.goodsForm.controls['price'].setValue(this.goods.price);
    this.goodsForm.controls['priceUnit'].setValue(this.goods.priceUnit.name);
    this.goodsForm.controls['storageType'].setValue(this.goods.storageType.name);
    this.goodsForm.controls['currentStatus'].setValue(this.goods.currentStatus ? this.goods.currentStatus.name : null);
    if (!isEditable) {
      this.goodsForm.controls['name'].disable();
      this.goodsForm.controls['quantity'].disable();
      this.goodsForm.controls['quantityUnit'].disable();
      this.goodsForm.controls['weight'].disable();
      this.goodsForm.controls['weightUnit'].disable();
      this.goodsForm.controls['price'].disable();
      this.goodsForm.controls['priceUnit'].disable();
      this.goodsForm.controls['storageType'].disable();
      this.goodsForm.controls['currentStatus'].disable();
    }


  }

  private close() {
    if (this.isEditable) {
      if (confirm("Изменения не были сохранены. Вы уверены, что хотите продолжить?")) {
        this.location.back();
      }
    } else {
      this.location.back();
    }
  }

  private save():void {
    let goods:Goods = new Goods();
    goods.id = this.goods.id;
    goods.name = this.goodsForm.controls['name'].value;
    goods.quantity = this.goodsForm.controls['quantity'].value;
    goods.weight = this.goodsForm.controls['weight'].value;
    goods.price = this.goodsForm.controls['price'].value;

    goods.storageType = new StorageType(null, this.goodsForm.controls['storageType'].value);
    goods.currentStatus = new GoodsStatus();
    if (this.goods.currentStatus)
      goods.currentStatus.name = this.goodsForm.controls['currentStatus'].value == this.goods.currentStatus.name ? '' : this.goodsForm.controls['currentStatus'].value;
    else goods.currentStatus.name = this.goodsForm.controls['currentStatus'].value;
    goods.quantityUnit = new Unit(null, this.goodsForm.controls['quantityUnit'].value);
    goods.weightUnit = new Unit(null, this.goodsForm.controls['weightUnit'].value);
    goods.priceUnit = new Unit(null, this.goodsForm.controls['priceUnit'].value);
    goods.cells = this.cells.map(
      item => {
        let storageCell = new StorageCell();
        storageCell.number = item.number;
        storageCell.idStorageCell = item.idStorageCell;
        return storageCell;
      }
    );
    this.goodsService.save(goods).subscribe(
      res=> {
        this.router.navigate(['../../list'], {relativeTo: this.route});
      }
    )
  }


}
