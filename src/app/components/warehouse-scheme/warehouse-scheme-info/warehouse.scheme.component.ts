import {WarehouseSchemeService} from "../warehouse-scheme.service";
import {Component, OnInit} from "@angular/core";
import {StorageSpace} from "../storage-space";
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {StorageCell} from "../storage-cell";
/**
 * Created by Lenovo on 14.05.2017.
 */
@Component({
  selector: 'app-warehouse-company',
  templateUrl: './warehouse.scheme.component.html',
  styleUrls: ['./warehouse.scheme.component.scss'],
  // providers: [WarehouseSchemeService]
})
export class WarehouseSchemeInfoComponent implements OnInit {
  cells: StorageCell[]=[];
  id_warehouse: number;
  storageSpace: StorageSpace[]=[];
  id_type: number;
  isPutAction: boolean;

  isShowDeletedSpace: boolean = false;
  isShowDeletedCell: boolean = false;

  constructor(private service: WarehouseSchemeService, private router:Router, private route:ActivatedRoute){
    console.log("CHECKED");
  }

  addSpace(id_warehouse: number){
    console.log(id_warehouse);
    this.router.navigate(['addspace'], {relativeTo: this.route});
  }

  editSpace(id_space: number){
    console.log("Redirect to edit space with id: "+id_space);
    this.router.navigate([id_space, 'edit'], {relativeTo: this.route});
  }

  addCell(id_space: number){
    console.log("Redirect to adding cell with id: "+id_space);
    this.router.navigate([id_space, 'cell', 'add'], {relativeTo: this.route});
  }

  editCell(id_space: number, id_cell: number) {
    console.log("Redirect to adding cell with id: "+id_space);
    this.router.navigate([id_space, 'cell', id_cell, 'edit'], {relativeTo: this.route});
  }

  putInCell(cell: StorageCell){
    for(let i = 0; i < this.cells.length; i++) {
      if(this.cells[i].idStorageCell == cell.idStorageCell) {
        this.cells.splice(i, 1);
        return;
      }
    }
    this.cells.push(cell);
    console.log("ID: "+cell.idStorageCell);
  }

  submitPut() {
    console.log("Submiting action");
    this.service.checkout(this.cells);
  }

  deleteSpace(id: number) {
    console.log(id);
    for(let i=0; i<this.storageSpace.length; i++) {
      if(this.storageSpace[i].idStorageSpace == id) {
        this.storageSpace[i].status = false;
        break;
      }
    }
    this.service.deleteSpace(id).subscribe(data => {
      console.log(data);
    });
  }

  restoreSpace(id: number){//todo or union it in the one method
    console.log(id);
    for(let i=0; i<this.storageSpace.length; i++) {
      if(this.storageSpace[i].idStorageSpace == id) {
        this.storageSpace[i].status = true;
        break;
      }
    }
    this.service.deleteSpace(id).subscribe(data => {
      console.log(data);
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
  }

  getClassCellSelected(id_cell: number){
    let isSelected: boolean=false;
    for(let i=0; i<this.cells.length; i++) {
      if(this.cells[i].idStorageCell == id_cell) {
        isSelected = true;
        break;
      }
    }
    return isSelected ? 'cell-selected' : 'cell-disable';
  }

  isDeleted(cell: StorageCell) {
    return !cell.status ? 'deleted' : 'cell-disable';
  }

  ngOnInit(){
    this.route.params.subscribe(params => { this.id_warehouse = params['id_warehouse']; });
    this.route.params.subscribe(params => { this.id_type = params['id_type']; });
    if(!isUndefined(this.id_warehouse) && !isUndefined(this.id_type)) {
      this.isPutAction = true;
    }

    this.service.getStorageSpace(this.id_warehouse).subscribe(data => {
      this.storageSpace = data;
    });
  }
}
