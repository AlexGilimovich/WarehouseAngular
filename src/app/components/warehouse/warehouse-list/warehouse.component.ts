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
  warehouse_search: Warehouse = new Warehouse;
  warehouse: Warehouse[]=[];

  constructor(private warehouseService: WarehouseService, private route:ActivatedRoute, private router:Router,){
    console.log("CHECKED");
    route.params.subscribe(params => { this.id = params['id']; });
    console.log("ID FROM constructor: "+this.id);
  }

  search(){
    console.log(this.warehouse_search.name);
  }

  ngOnInit(){
    console.log("open method get data warehouse customer");
    this.warehouseService.getWarehouse(this.id, 1, 10).subscribe(data => {
      this.warehouse = data;
    });
  }

  edit(id_warehouse: string){
    this.router.navigate([id_warehouse, 'edit'], {relativeTo: this.route});
  }

  delete(id_warehouse: number) {
    console.log("delte warehouse with id: "+id_warehouse);
    this.warehouseService.delete(id_warehouse).subscribe(data => {
      console.log(data);
    });
  }

  registration(id: string){
    console.log("registration action for warehouse with id:"+id);

    this.router.navigate(['./registration'], {relativeTo: this.route});
  }

  findSpace(id: string){
    console.log("call findSpace(id: String)");
    console.log(id);
    this.router.navigate([id, 'scheme'], {relativeTo: this.route});
  }
}
