/**
 * Created by Lenovo on 15.05.2017.
 */
import { Component, OnInit } from '@angular/core';
import {WarehouseCompany} from "../warehouse-company";
import {WarehouseCompanyService} from "../warehouse-company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {User} from "../../user/user";
import {MapService} from "../../../util/map.service";
import {MapView} from "../../../util/map";
declare var $: any;

@Component({
  selector: 'app-warehouse-company-create',
  templateUrl: './warehouse.company.create.component.html',
  styleUrls: ['./warehouse.company.create.component.scss'],
  providers: [WarehouseCompanyService, MapService]
})
export class WarehouseCompanyCreateComponent implements OnInit {
  id: number;
  warehouseCompany = new WarehouseCompany;
  user: User=new User;
  email:string;
  isRegistration: boolean;
  map: MapView = new MapView(this.mapService);
  address: string;

  constructor(private companyService: WarehouseCompanyService,
              private mapService: MapService,
              private router:Router,
              private route:ActivatedRoute){
    console.log("CHECKED from created component");
  }

  checkout(){
    this.map.getCoordByAddress(this.address);
  }

  registration(warehouseCompany: WarehouseCompany){
    console.log(this.email);
    console.log(warehouseCompany);
    warehouseCompany.x = this.map.getX();
    warehouseCompany.y = this.map.getY();
    this.companyService.save(warehouseCompany, this.email).subscribe(data => {
      console.log(this.user);
    });
    if(isUndefined(this.id)) {
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
  }

  ngOnInit(){
    $("body").foundation();
    this.route.params.subscribe(params => { this.id = params['id']; });
    if(!isUndefined(this.id)) {
      this.isRegistration = false;
      this.companyService.getCompanyById(this.id).subscribe(data => {
        this.warehouseCompany = data[0];
        this.map.setOneCoordinate(this.warehouseCompany.x, this.warehouseCompany.y);
      });
    } else {
      this.isRegistration = true;
    }
  }
}
