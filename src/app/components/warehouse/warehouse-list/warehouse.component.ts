/**
 * Created by Lenovo on 13.05.2017.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import { Response} from '@angular/http';

import {WarehouseService} from "../warehouse.service";
import {Warehouse} from "../warehouse";
import {ActivatedRoute, Router} from "@angular/router";
import {WarehouseCompany} from "../../warehouse-company/warehouse-company";
import {marker} from "../../../util/marker";
import {WarehouseSchemeService} from "../../warehouse-scheme/warehouse-scheme.service";
import {BaseChartDirective} from "ng2-charts";
import {MapView} from "../../../util/map";

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

  itemsOnPage: number = 5;
  itemsOnPageArray: number[] = [5,10,15,20];
  isShowDeleted: boolean = false;
  isLastPage: boolean = false;

  map: MapView = new MapView;

  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
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
    this.page = 1;
  }

  getData(position: number){
    this.warehouseService.getWarehouse(this.id, position, this.itemsOnPage).subscribe(data => {
      this.warehouse = data;

      this.map.init(this.warehouse);

      this.clearData();
      for (let i = 0; i < this.warehouse.length; i++) {
        //if(this.warehouse[i].status) {
          this.setUpOneValueOfChart(i);
        //}
      }

      //this.chart.chart.update();//todo обновляется, но зачёркиваются лейблы
    });

    this.warehouseService.getWarehouse(this.id, position+this.itemsOnPage, this.itemsOnPage).subscribe(data => {
      if(data.length == 0) {
        this.isLastPage = true;
      }
      else {
        this.isLastPage = false;
      }
    })
  }

  private clearData() {
    this.pieChartLabels.splice(0, this.pieChartLabels.length);
    this.pieChartData.splice(0, this.pieChartData.length);
    this.barChartData.splice(0, this.barChartData.length);
    this.barChartLabels.splice(0, this.barChartLabels.length);
  }

  private setUpOneValueOfChart(index: number){
    this.pieChartLabels.push(this.warehouse[index].name);
    this.barChartLabels.push(this.warehouse[index].name);

    this.warehouseSchemeService.getStorageSpace(this.warehouse[index].idWarehouse).subscribe(data => {
      //console.log('Чтение данных');
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
    this.getData((this.page-1)*this.itemsOnPage);
  }

  prevPage(){
    this.page--;
    this.getData((this.page-1)*this.itemsOnPage);
  }

  search(){
    this.warehouse_search.warehouseCompany = new WarehouseCompany;
    this.warehouse_search.warehouseCompany.idWarehouseCompany = this.id;

    this.warehouseService.search(this.warehouse_search).subscribe(data => {
      this.warehouse = data;
    });
  }

  ngOnInit(){
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.getData(0);
  }

  edit(id_warehouse: string){
    this.router.navigate([id_warehouse, 'edit'], {relativeTo: this.route});
  }

  delete(id_warehouse: number) {
    console.log("delte warehouse with id: "+id_warehouse);
    for(let i=0; i<this.warehouse.length; i++) {
      if(this.warehouse[i].idWarehouse==id_warehouse) {
        this.warehouse[i].status = false;
        let idx = this.pieChartLabels.indexOf(this.warehouse[i].name);
        if (idx != -1) {
          console.log("delete labels with id "+ idx);
          this.pieChartLabels.splice(idx, 1);// Второй параметр - число элементов, которые необходимо удалить
        }
        break;
      }
    }
    this.warehouseService.delete(id_warehouse).subscribe(data => {
      console.log(data);
    });
  }

  registration(id: string){
    this.router.navigate(['./registration'], {relativeTo: this.route});
  }

  findSpace(id: string){
    this.router.navigate([id, 'scheme'], {relativeTo: this.route});
  }

  restore(id_warehouse: number){
    console.log("restore warehouse with id: "+id_warehouse);
    for(let i=0; i<this.warehouse.length; i++) {
      if(this.warehouse[i].idWarehouse == id_warehouse) {
        this.warehouse[i].status = true;
        break;
      }
    }
    this.warehouseService.delete(id_warehouse).subscribe(data => {
      console.log(data);
    });
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
