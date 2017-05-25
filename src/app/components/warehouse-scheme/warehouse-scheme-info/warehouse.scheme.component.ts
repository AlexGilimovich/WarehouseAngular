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
  providers: [WarehouseSchemeService]
})
export class WarehouseSchemeInfoComponent implements OnInit {
  cells: StorageCell[]=[];
  id_warehouse: number;
  storageSpace: StorageSpace[]=[];
  id_type: number;
  isPutAction: boolean;

  constructor(private service: WarehouseSchemeService, private router:Router, private route:ActivatedRoute){
    console.log("CHECKED");
    route.params.subscribe(params => { this.id_warehouse = params['id_warehouse']; });
    route.params.subscribe(params => { this.id_type = params['id_type']; });
    if(!isUndefined(this.id_warehouse) && !isUndefined(this.id_type)) {
      this.isPutAction = true;
    }
    console.log("ID FROM constructor WarehouseSchemeInfoComponent: "+this.id_warehouse);
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
    this.cells.push(cell);
    console.log("ID: "+cell.idStorageCell);
  }

  submitPut(){
    console.log("Submiting action");
    this.service.checkout(this.cells);
  }

  ngOnInit(){
    console.log("open method get data warehouse company");
    this.service.getStorageSpace(this.id_warehouse).subscribe(data => {
      this.storageSpace = data;
    });
  }
}
