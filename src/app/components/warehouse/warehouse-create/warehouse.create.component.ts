/**
 * Created by Lenovo on 16.05.2017.
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {Warehouse} from "../warehouse";
import {WarehouseService} from "../warehouse.service";
import {WarehouseCompany} from "../../warehouse-company/warehouse-company";
import {MapService} from "../../../util/map.service";
import {MapView} from "../../../util/map";

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse.create.component.html',
  styleUrls: ['./warehouse.create.component.scss'],
  providers: [WarehouseService, MapService]
})
export class WarehouseCreateComponent implements OnInit {
  id: number;
  warehouse = new Warehouse;
  map: MapView = new MapView(this.mapService);
  address: string;

  constructor(private warehouseService: WarehouseService,
              private mapService: MapService,
              private router:Router,
              private route:ActivatedRoute){
  }

  setAddress(address: string){
    this.address = address;
  }

  checkout(){
    this.map.getCoordByAddress(this.address);
  }

  registration(warehouse: Warehouse){
    warehouse.warehouseCompany = new WarehouseCompany;
    warehouse.warehouseCompany.idWarehouseCompany = this.id;
    warehouse.x = this.map.getX();
    warehouse.y = this.map.getY();
    this.warehouseService.save(warehouse).subscribe(data => {
      if(isUndefined(this.warehouse.idWarehouse)) {
        this.router.navigate(['../'], {relativeTo: this.route});
      } else {
        this.router.navigate(['../../'], {relativeTo: this.route});
      }
    });
  }

  ngOnInit(){
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.route.params.subscribe(params => { this.warehouse.idWarehouse = params['id_warehouse']; });

    if(!isUndefined(this.warehouse.idWarehouse)) {
      this.warehouseService.getWarehouseById(this.warehouse.idWarehouse).subscribe(data => {
        this.warehouse = data[0];
        this.mapService.getAddress(this.warehouse.x, this.warehouse.y, this.setAddress.bind(this));
        this.map.setOneCoordinate(this.warehouse.x, this.warehouse.y);
      });
    }
  }
}
