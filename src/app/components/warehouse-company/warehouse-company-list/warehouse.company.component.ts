/**
 * Created by Lenovo on 09.05.2017.
 */
import { Component, OnInit } from '@angular/core';
import {WarehouseCompany} from "../warehouse-company";
import { Response} from '@angular/http';
import {WarehouseCompanyService} from "../warehouse-company.service";
import {WarehouseService} from "../../warehouse/warehouse.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MapView} from "../../../util/map";

@Component({
  selector: 'app-warehouse-company',
  templateUrl: './warehouse.company.component.html',
  styleUrls: ['./warehouse.company.component.scss'],
  providers: [WarehouseCompanyService]
})
export class WarehouseCompanyComponent implements OnInit {
  warehouseCompany: WarehouseCompany[]=[];
  searchWarehouseCompany: WarehouseCompany = new WarehouseCompany;

  map: MapView = new MapView;
  page: number;

  itemsOnPage: number = 5;
  itemsOnPageArray: number[] = [5,10,15,20];
  isShowDeleted: boolean = false;
  isLastPage: boolean = false;
  isAdmin: boolean = false;

  constructor(private companyService: WarehouseCompanyService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(){
    this.page = 1;
    this.getData(0);
    this.companyService.getAllCompany().subscribe(data => {
      this.map.init(data);
    });
  }

  getData(position: number){
    this.companyService.getCompany(position, this.itemsOnPage).subscribe(data => {
      this.warehouseCompany = data;
      if(this.warehouseCompany.length > 1) {
        this.isAdmin = true;
      }
      //this.map.init(this.warehouse);
    });

    this.companyService.getCompany(position+this.itemsOnPage, this.itemsOnPage).subscribe(data => {
      if(data.length == 0) {
        this.isLastPage = true;
      }
      else {
        this.isLastPage = false;
      }
    })
  }

  nextPage(){
    this.page++;
    this.getData((this.page-1)*this.itemsOnPage);
  }

  prevPage(){
    this.page--;
    this.getData((this.page-1)*this.itemsOnPage);
  }

  findWarehouse(id: string){
    console.log("call findWarehouse(id: String)");
    console.log(id);
    this.router.navigate(['./', id, 'warehouse'], {relativeTo: this.route});
  }

  delete(idWarehouseCompany: number){
    this.changeStatus(idWarehouseCompany);
  }

  restore(idWarehouseCompany: number){
    this.changeStatus(idWarehouseCompany);
  }

  private changeStatus(idWarehouseCompany: number){
    for(let i=0; i<this.warehouseCompany.length; i++) {
      if(this.warehouseCompany[i].idWarehouseCompany == idWarehouseCompany) {
        this.warehouseCompany[i].status = !this.warehouseCompany[i].status;
        break;
      }
    }
    this.companyService.delete(idWarehouseCompany).subscribe(data => {
      console.log(data);
    });
  }

  edit(id: string){
    console.log("Id from edit"+id);
    this.router.navigate(['./edit', id], {relativeTo: this.route});
  }

  search(){
    this.companyService.search(this.searchWarehouseCompany).subscribe(data => {
      this.warehouseCompany = data;
    });
  }
}
