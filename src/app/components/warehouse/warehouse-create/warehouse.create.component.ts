/**
 * Created by Lenovo on 16.05.2017.
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {Warehouse} from "../warehouse";
import {WarehouseService} from "../warehouse.service";
import {WarehouseCompany} from "../../warehouse-company/warehouse-company";

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse.create.component.html',
  styleUrls: ['./warehouse.create.component.scss'],
  providers: [WarehouseService]
})
export class WarehouseCreateComponent implements OnInit {
  id: number;
  warehouse = new Warehouse;

  constructor(private warehouseService: WarehouseService, private router:Router, private route:ActivatedRoute){
    console.log("CHECKED from created component");
    route.params.subscribe(params => { this.id = params['id']; });
    route.params.subscribe(params => { this.warehouse.idWarehouse = params['id_warehouse']; });
    console.log(this.id);
    console.log("ID of warehouse: "+this.warehouse.idWarehouse);
    if(!isUndefined(this.warehouse.idWarehouse)) {
      console.log("id determined => update action");
      this.warehouseService.getWarehouseById(this.warehouse.idWarehouse).subscribe(data => {
        this.warehouse = data[0];// todo remake without list container
      });
    }
  }

  registration(warehouse: Warehouse){
    console.log("Warehouse: "+warehouse.name);
    console.log("WarehouseCompany ID: "+this.id);
    warehouse.warehouseCompany = new WarehouseCompany;
    warehouse.warehouseCompany.idWarehouseCompany = this.id;
    this.warehouseService.save(warehouse).subscribe(data => {
      console.log(data);
    });
    console.log("Pre-Condition: "+this.warehouse.idWarehouse);
    if(isUndefined(this.warehouse.idWarehouse)) this.router.navigate(['../'], {relativeTo: this.route});
    else this.router.navigate(['../../'], {relativeTo: this.route});
  }

  ngOnInit(){
    console.log("!!!registration page of warehouse redirect");
  }
}
