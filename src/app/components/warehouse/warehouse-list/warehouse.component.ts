/**
 * Created by Lenovo on 13.05.2017.
 */

import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';

import {WarehouseService} from "../warehouse.service";
import {Warehouse} from "../warehouse";
import {ActivatedRoute, Router} from "@angular/router";
import {WarehouseCompany} from "../../warehouse-company/warehouse-company";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
  providers: [WarehouseService]
})
export class WarehouseComponent implements OnInit {
  id: number;
  page: number;
  warehouse_search: Warehouse = new Warehouse;
  warehouse: Warehouse[]=[];
  itemsOnPage: number = 5;
  itemsOnPageArray: number[] = [5,10,15,20];

  constructor(private warehouseService: WarehouseService, private route:ActivatedRoute, private router:Router){
    console.log("CHECKED");
    this.page = 1;
    console.log("ID FROM constructor: "+this.id);
  }

  getData(position: number){
    this.warehouseService.getWarehouse(this.id, position, this.itemsOnPage).subscribe(data => {
      this.warehouse = data;
    });
  }

  nextPage(){
    this.page++;
    console.log(this.itemsOnPage);
    this.getData((this.page-1)*this.itemsOnPage);
  }

  prevPage(){
    this.page--;
    console.log(this.itemsOnPage);
    this.getData((this.page-1)*this.itemsOnPage);
  }

  search(){
    console.log(this.warehouse_search.name);
    this.warehouse_search.warehouseCompany = new WarehouseCompany;
    this.warehouse_search.warehouseCompany.idWarehouseCompany = this.id;
    console.log(this.warehouse_search.warehouseCompany.idWarehouseCompany);
    this.warehouseService.search(this.warehouse_search).subscribe(data => {
      this.warehouse = data;
    });
  }

  ngOnInit(){
    this.route.params.subscribe(params => { this.id = params['id']; });
    console.log("open method get data warehouse customer");
    console.log(this.id);
    this.getData(0);
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





  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
