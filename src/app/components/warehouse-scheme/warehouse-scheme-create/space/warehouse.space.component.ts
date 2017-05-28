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
    route.params.subscribe(params => { this.id = params['id']; });
    route.params.subscribe(params => { this.id_warehouse = params['id_warehouse']; });
    route.params.subscribe(params => { this.id_storage_space = params['id_space']; });
    console.log("ID STORAGE SAPCE"+this.id_storage_space);

    this.schemeService.getStorageSpace(this.id_warehouse).subscribe(data => {
      this.storageSpace = data;
      for(var i=0; i<this.storageSpace.length; i++){
        if(this.storageSpace[i].idStorageSpace==this.id_storage_space){
          this.selectedStorageSpace = this.storageSpace[i];
          console.log("from cycle"+this.storageSpace[i]);
        }
      }
      console.log("AFTER"+this.selectedStorageSpace.storageSpaceType.name);
    });

  }

  createSpace(){
    console.log(this.selectedSpaceType);
    this.space.idStorageSpace = this.id_storage_space;
    this.space.idStorageSpaceType = this.selectedSpaceType.idStorageSpaceType;
    //this.space.idStorageSpace = 0;
    this.route.params.subscribe(params => { this.space.idWarehouse = params['id_warehouse']; });
    console.log("OBJECT: "+this.space);
    this.schemeService.saveSpace(this.space).subscribe(data => {
      //this.warehouseCompany = data;
    });
    if(isUndefined(this.id_storage_space)) this.router.navigate(['../'], {relativeTo: this.route});
    else this.router.navigate(['../../'], {relativeTo: this.route});
  }

  ngOnInit(){
    console.log("INIT SPACE method");
    this.schemeService.getAllSpaceType().subscribe(data => {
      this.spaceType = data;
    });
  }
}
