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
import {GoodsService} from "../../../goods/goods.service";
import {Goods} from "../../../goods/goods";

@Component({
  selector: 'app-warehouse-cell',
  templateUrl: './warehouse.cell.component.html',
  styleUrls: ['./warehouse.cell.component.scss'],
})

export class WarehouseCellComponent implements OnInit {
  public goods: Goods = new Goods;
  cell: StorageCellDTO = new StorageCellDTO;

  constructor(private goodsService: GoodsService, private schemeService: WarehouseSchemeService, private router:Router, private route:ActivatedRoute){
    route.params.subscribe(params => { this.cell.idStorageSpace = params['id_space']; });
    route.params.subscribe(params => { this.cell.idStorageCell = params['id_cell']; });
  }

  createCell(){
    this.schemeService.saveCell(this.cell).subscribe(data => {
      if(this.cell.idStorageCell == 0) {
        this.router.navigate(['../../../'], {relativeTo: this.route});
      }
      else {
        this.router.navigate(['../../../../'], {relativeTo: this.route});
      }
    });
  }

  changeStatus(id: string){
    this.schemeService.deleteCell(id).subscribe(data => {
      this.router.navigate(['../../../../'], {relativeTo: this.route});
    });
  }

  ngOnInit() {
    if (isUndefined(this.cell.idStorageCell)) {
      this.cell.idStorageCell = 0;
    }
    if (this.cell.idStorageCell != 0) {
      this.schemeService.getCellById(this.cell.idStorageCell).subscribe(data => {
        this.goods = data[0].goods;
        this.cell.number = data[0].number;
        this.cell.status = data[0].status;
        this.cell.idStorageCell = data[0].idStorageCell;
      });
    }
  }
}
