/**
 * Created by Lenovo on 09.05.2017.
 */
import { Component, OnInit } from '@angular/core';
import {WarehouseCompany} from "../warehouse-company";
import { Response} from '@angular/http';
import {WarehouseCompanyService} from "../warehouse-company.service";
import {WarehouseService} from "../../warehouse/warehouse.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-warehouse-company',
  templateUrl: './warehouse.company.component.html',
  styleUrls: ['./warehouse.company.component.scss'],
  providers: [WarehouseCompanyService]
})
export class WarehouseCompanyComponent implements OnInit {

  warehouseCompany: WarehouseCompany[]=[];

  constructor(private companyService: WarehouseCompanyService, private router:Router, private route:ActivatedRoute){}

  findWarehouse(id: string){
    console.log("call findWarehouse(id: String)");
    console.log(id);
    this.router.navigate(['../warehouse', id], {relativeTo: this.route});
  }

  ngOnInit(){
    console.log("open method get data warehouse company");
    this.companyService.getCompany().subscribe(data => {
      this.warehouseCompany = data;
    });
  }
}
