/**
 * Created by Lenovo on 13.05.2017.
 */

import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';

import {WarehouseService} from "../warehouse.service";
import {Warehouse} from "../warehouse";
import {ActivatedRoute, Router} from "@angular/router";
import {WarehouseCompany} from "../../warehouse-company/warehouse-company";
import {marker} from "../../../util/marker";
import {WarehouseSchemeService} from "../../warehouse-scheme/warehouse-scheme.service";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
  providers: [WarehouseService, WarehouseSchemeService]
})
export class WarehouseComponent implements OnInit {
  id: number;
  page: number;
  warehouse_search: Warehouse = new Warehouse;
  warehouse: Warehouse[]=[];

  zoom: number = 5;
  lat: number = 48.152047;
  lng: number = 15.134961;

  markers: marker[] = [];
  object_marker: marker = new marker;

  itemsOnPage: number = 5;
  itemsOnPageArray: number[] = [5,10,15,20];

  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  public ChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    //maintainAspectRatio: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  private all: number[]=[];
  private engaged: number[]=[];
  public barChartData:any[] = [];

  public isDataAvailable:boolean = false;


  constructor(private warehouseSchemeService: WarehouseSchemeService,private warehouseService: WarehouseService, private route:ActivatedRoute, private router:Router){
    console.log("CHECKED");
    this.page = 1;
    console.log("ID FROM constructor: "+this.id);
  }

  getData(position: number){
    this.warehouseService.getWarehouse(this.id, position, this.itemsOnPage).subscribe(data => {
      this.warehouse = data;

      this.initMapMarkers();

      for (let i = 0; i < this.warehouse.length; i++) {
        this.setUpOneValueOfChart(i);
      }

    });
  }

  private initMapMarkers(){
    for (let i = 0; i < this.warehouse.length; i++) {
      this.object_marker = new marker;
      this.object_marker.name = this.warehouse[i].name;
      this.object_marker.draggable = true;
      this.object_marker.lat = this.warehouse[i].x;
      this.object_marker.lng = this.warehouse[i].y;
      this.markers.push(this.object_marker);
    }

    if(this.warehouse.length != 0){//init first view/coordinates
      this.lat == this.markers[0].lat;
      this.lng == this.markers[0].lng;
    }
  }

  private setUpOneValueOfChart(index: number){
    this.pieChartLabels.push(this.warehouse[index].name);
    this.barChartLabels.push(this.warehouse[index].name);

    this.warehouseSchemeService.getStorageSpace(this.warehouse[index].idWarehouse).subscribe(data => {
      console.log('Чтение данных');
      let count_cell = 0;
      let free_cell = 0;
      for(let j=0; j<data.length; j++) {
        count_cell+= data[j].storageCellList.length;
        for(let k=0; k<data[j].storageCellList.length; k++){
          if(data[j].storageCellList[k].goods==null) {
            free_cell++;
          }
        }
      }
      console.log(index, count_cell);
      console.log(count_cell, free_cell);

      //set value to pie chart and bar chart
      this.pieChartData.splice(index, 0, count_cell);
      this.all.splice(index, 0, count_cell);
      this.engaged.splice(index, 0, count_cell-free_cell);

      if(this.pieChartData.length == this.warehouse.length) {//when all data received
        this.barChartData.push(
          {
            data: this.engaged,
            label: 'Занято'
          });
        this.barChartData.push(
          {
            data: this.all,
            label: 'Всего'
          });

        this.isDataAvailable = true;
      }
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


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
