/**
 * Created by Lenovo on 13.05.2017.
 */

import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';

import {WarehouseService} from "../warehouse.service";
import {Warehouse} from "../warehouse";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
  providers: [WarehouseService]
})
export class WarehouseComponent implements OnInit {
  id: number;
  warehouse: Warehouse[]=[];

  constructor(private warehouseService: WarehouseService, private route:ActivatedRoute, private router:Router,){
    console.log("CHECKED");
    route.params.subscribe(params => { this.id = params['id']; });
    console.log("ID FROM constructor: "+this.id);
  }

  ngOnInit(){
    console.log("open method get data warehouse customer");
    this.warehouseService.getWarehouse(this.id).subscribe(data => {
      this.warehouse = data;
    });
  }

  findSpace(id: string){
    console.log("call findSpace(id: String)");
    console.log(id);
    this.router.navigate(['../../warehouse-scheme', id], {relativeTo: this.route});
  }
}
