/**
 * Created by Lenovo on 16.05.2017.
 */

import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';

import {ActivatedRoute, Router} from "@angular/router";
import {WarehouseSchemeService} from "../../warehouse-scheme.service";
import {StorageSpaceType} from "../../storage-space-type";
import {StorageSpace} from "../../storage-space";
import {StorageSpaceDTO} from "../../storage-space-DTO";
import {isUndefined} from "util";

@Component({
  selector: 'app-warehouse-space',
  templateUrl: './warehouse.space.component.html',
  styleUrls: ['./warehouse.space.component.scss'],
  // providers: [WarehouseSchemeService]
})
export class WarehouseSpaceComponent implements OnInit {
  id: number;
  id_warehouse: number;
  id_storage_space: number;

  storageSpace: StorageSpace[]=[];
  selectedStorageSpace: StorageSpace = new StorageSpace;

  spaceType: StorageSpaceType[]=[];
  selectedSpaceType: StorageSpaceType = new StorageSpaceType;
  space: StorageSpaceDTO = new StorageSpaceDTO;

  constructor(private schemeService: WarehouseSchemeService, private router:Router, private route:ActivatedRoute){
  }

  createSpace(){
    this.space.idStorageSpace = this.id_storage_space;
    this.space.idStorageSpaceType = this.selectedSpaceType.idStorageSpaceType;
    this.space.status = this.selectedStorageSpace.status;
    this.route.params.subscribe(params => { this.space.idWarehouse = params['id_warehouse']; });

    this.schemeService.saveSpace(this.space).subscribe(data => {
      if(isUndefined(this.id_storage_space)) {
        this.router.navigate(['../'], {relativeTo: this.route});
      } else {
        this.router.navigate(['../../'], {relativeTo: this.route});
      }
    });
  }

  ngOnInit(){
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.route.params.subscribe(params => { this.id_warehouse = params['id_warehouse']; });
    this.route.params.subscribe(params => { this.id_storage_space = params['id_space']; });

    this.schemeService.getStorageSpace(this.id_warehouse).subscribe(data => {
      this.storageSpace = data;
      for (let i = 0; i < this.storageSpace.length; i++) {
        if (this.storageSpace[i].idStorageSpace == this.id_storage_space) {//so don't create other function
          //to REST-services
          this.selectedStorageSpace = this.storageSpace[i];
        }
      }
    });

    this.schemeService.getAllSpaceType().subscribe(data => {
      this.spaceType = data;
    });
  }
}
