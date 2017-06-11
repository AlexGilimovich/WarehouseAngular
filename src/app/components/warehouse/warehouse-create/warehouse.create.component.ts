/**
 * Created by Lenovo on 16.05.2017.
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {FormsModule} from "@angular/forms";
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
  }

  registration(warehouse: Warehouse){
    warehouse.warehouseCompany = new WarehouseCompany;
    warehouse.warehouseCompany.idWarehouseCompany = this.id;
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
      });
    }
  }
}
