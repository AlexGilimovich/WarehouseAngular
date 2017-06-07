/**
 * Created by Lenovo on 18.05.2017.
 */

import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';

import {ActivatedRoute, Router} from "@angular/router";
import {WarehouseSchemeService} from "../../warehouse-scheme.service";
import {StorageSpaceType} from "../../storage-space-type";
import {StorageSpace} from "../../storage-space";
import {StorageSpaceDTO} from "../../storage-space-DTO";
import {StorageCellDTO} from "../../storage-cell-DTO";
import {StorageCell} from "../../storage-cell";
import {isUndefined} from "util";

@Component({
  selector: 'app-warehouse-cell',
  templateUrl: './warehouse.cell.component.html',
  styleUrls: ['./warehouse.cell.component.scss'],
  // providers: [WarehouseSchemeService]
})

export class WarehouseCellComponent implements OnInit {
  id_goods: number;
  cell: StorageCellDTO = new StorageCellDTO;

  constructor(private schemeService: WarehouseSchemeService, private router:Router, private route:ActivatedRoute){
    route.params.subscribe(params => { this.cell.idStorageSpace = params['id_space']; });
    route.params.subscribe(params => { this.cell.idStorageCell = params['id_cell']; });
    if(isUndefined(this.cell.idStorageCell)) {
      console.log("ID is undefined!");
      this.cell.idStorageCell = 0;
    }
    console.log("!!!Constructor from cell!!!");
    this.schemeService.getCellById(this.cell.idStorageCell).subscribe(data => {
      this.cell.number = data[0].number;
      this.cell.status = data[0].status;
      this.cell.idStorageCell = data[0].idStorageCell;
      console.log("FROM EDITING CELL: "+this.cell);
    });

  }

  createCell(){
    console.log("Cell from controller: "+this.cell.number+' '+this.cell.idStorageCell+' '+this.cell.idStorageSpace);
    console.log("Create cell action");
    this.schemeService.saveCell(this.cell).subscribe(data => {
      //this.warehouseCompany = data;
    });
    if(isUndefined(this.cell.idStorageCell)) {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
    else {
      this.router.navigate(['../../../'], {relativeTo: this.route});
    }
  }

  deleteCell(id: string){
    console.log(id);
    this.schemeService.deleteCell(id).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  ngOnInit(){
    console.log("INIT CELL method");
  }
}
