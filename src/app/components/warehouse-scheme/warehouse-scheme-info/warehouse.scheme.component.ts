import {WarehouseSchemeService} from "../warehouse-scheme.service";
import {Component, OnChanges, OnInit, ViewEncapsulation} from "@angular/core";
import {StorageSpace} from "../storage-space";
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {StorageCell} from "../storage-cell";
import {Goods} from "../../goods/goods";
import {StorageCellDTO} from "../storage-cell-DTO";
import {GoodsService} from "../../goods/goods.service";
/**
 * Created by Lenovo on 14.05.2017.
 */
@Component({
  selector: 'app-warehouse-company',
  templateUrl: './warehouse.scheme.component.html',
  styleUrls: ['./warehouse.scheme.component.scss'],
  // providers: [WarehouseSchemeService]
})
export class WarehouseSchemeInfoComponent implements OnInit, OnChanges {
  cells: StorageCell[]=[];

  goods: Goods[]=[];

  id_goods: number;
  id_invoice: number;
  id_warehouse: number;
  storageSpace: StorageSpace[]=[];
  id_type: number;
  isPutAction: boolean = false;//когда вообще действие помещения в ячейки
  isReplaceAction: boolean = false;//когда перемещение из накладной
  selectedGoods: Goods = null;

  isShowDeletedSpace: boolean = false;
  isShowDeletedCell: boolean = false;

  constructor(private goodsService: GoodsService, private service: WarehouseSchemeService, private router:Router, private route:ActivatedRoute){
    this.service.selectedGoods$.subscribe(
      goods => {
        this.addGoodsToArray(goods);
      }
    );
  }

  private addGoodsToArray(goods: Goods){
    let isExists: boolean = false;
    for(let i=0; i<this.goods.length; i++) {
      if(this.goods[i].id == goods.id) {
        isExists = true;
      }
      if(this.goods[i].id == this.selectedGoods.id) {
        this.goods[i] = this.selectedGoods;//если была смена товара
        this.resolveCellWhichUseInBothGoods();
      }
      this.resolveTypeConflict(i, goods);
    }
    if(!isExists) {
      this.goods.push(goods);
    }
    this.id_type = Number(goods.storageType.id);
    this.selectedGoods = goods;
  }

  /**
   * For back lighting in yellow
   * */
  private resolveTypeConflict(i: number, goods: Goods){
    if(this.goods[i].storageType.id == goods.storageType.id) {//если товар с таким же типом хранения
      for(let k=0; k<this.storageSpace.length; k++) {
        for(let l=0; l<this.storageSpace[k].storageCellList.length; l++) {
          for(let m=0; m<this.goods[i].cells.length; m++) {
            if(this.storageSpace[k].storageCellList[l].idStorageCell == this.goods[i].cells[m].idStorageCell) {
              this.storageSpace[k].storageCellList[l].goods = new Goods();//жёлтым красит
            }
          }
        }
      }
    }
  }

  private resolveCellWhichUseInBothGoods(){
    for(let i=0; i<this.goods.length; i++) {//проверяется наличие у одинковых товаров одинковых ячеек
      for(let j=0; j<this.goods[i].cells.length; j++) {
        for(let k=i+1; k<this.goods.length; k++) {
          for(let m=0; m<this.goods[k].cells.length; m++) {
            if(this.goods[i].cells[j].idStorageCell == this.goods[k].cells[m].idStorageCell) {
              /*console.log("Ячейка "+this.goods[i].cells[j].idStorageCell+" находится в товаре"
                +this.goods[i].name+" и "+ this.goods[k].name);*/
              this.goods[i].cells.splice(j, 1);
              return;
            }
          }
        }
      }
    }
  }

  addSpace(id_warehouse: number){
    this.router.navigate(['addspace'], {relativeTo: this.route});
  }

  editSpace(id_space: number){
    this.router.navigate([id_space, 'edit'], {relativeTo: this.route});
  }

  addCell(id_space: number){
    this.router.navigate([id_space, 'cell', 'add'], {relativeTo: this.route});
  }

  editCell(id_space: number, id_cell: number) {
    this.router.navigate([id_space, 'cell', id_cell, 'edit'], {relativeTo: this.route});
  }

  putInCell(cell: StorageCell) {
    for(let i = 0; i < this.selectedGoods.cells.length; i++) {
      if(this.selectedGoods.cells[i].idStorageCell == cell.idStorageCell) {
        cell.goods = null;//remove it if it will necessary
        this.selectedGoods.cells.splice(i, 1);
        return;
      }
    }
    this.selectedGoods.cells.push(cell);
  }

  fixCurrentState() {
    this.service.deleteGoodsListSource.next(this.selectedGoods);
  }

  submitPut() {
    if(this.goods.length == 0) {
      this.goods.push(this.selectedGoods);
    }
    for(let i =0; i < this.goods.length; i++) {
      this.goodsService.putInStorage(this.goods[i]).subscribe(data => {
        this.router.navigate(['../../../../../list'], {relativeTo: this.route});
      });
    }
  }

  deleteSpace(id: number) {
    for(let i=0; i<this.storageSpace.length; i++) {
      if(this.storageSpace[i].idStorageSpace == id) {
        this.storageSpace[i].status = false;
        break;
      }
    }
    this.service.deleteSpace(id).subscribe(data => {

    });
  }

  restoreSpace(id: number){
    for(let i=0; i<this.storageSpace.length; i++) {
      if(this.storageSpace[i].idStorageSpace == id) {
        this.storageSpace[i].status = true;
        break;
      }
    }
    this.service.deleteSpace(id).subscribe(data => {
    });
  }

  /**
   * return css-class for determined storage type
   **/
  getClassSpace(space: StorageSpace){
    if(!space.status && this.isShowDeletedSpace) return 'deleted';
    if(space.storageSpaceType.name == 'Холодильная камера') return 'icecamera';
    if(space.storageSpaceType.name == 'Отапливаемое помещение') return 'heated';
    if(space.storageSpaceType.name == 'Неотапливаемое помещение') return 'noheated';
    if(space.storageSpaceType.name == 'Открытая площадка') return 'open';
    if(space.storageSpaceType.name == 'Камера глубокой заморозки') return 'icedeepcamera';
    return 'default';
  }

  getClassCellSelected(cell: StorageCell){
    for(let i=0; i < this.selectedGoods.cells.length; i++) {
      if(this.selectedGoods.cells[i].idStorageCell == cell.idStorageCell) {
        return 'cell-selected';
      }
    }

    return 'cell-disable';
  }

  isDeleted(cell: StorageCell) {
    return !cell.status ? 'deleted' : 'cell-disable';
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id_invoice = params['id_invoice'];
      if(!isUndefined(this.id_invoice)) {
        this.isReplaceAction = true;
        this.isPutAction = true;
      }
    });

    this.route.params.subscribe(params => {
      this.id_warehouse = params['id_warehouse'];
      this.service.getStorageSpace(this.id_warehouse).subscribe(data => {
        this.storageSpace = data;
      });
    });

    this.route.params.subscribe(params => {
      this.id_goods = params['id_type'];//it's not type - it's id goods now
      if(!isUndefined(this.id_goods)) {
        this.goodsService.get(this.id_goods).subscribe(data => {
          this.selectedGoods = data;
          this.id_type = Number(this.selectedGoods.storageType.id);
          this.isPutAction = true;
        });
      }
    });
  }

  ngOnChanges(){
  }
}
