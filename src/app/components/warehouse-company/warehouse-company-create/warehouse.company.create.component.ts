/**
 * Created by Lenovo on 15.05.2017.
 */
import { Component, OnInit } from '@angular/core';
import {WarehouseCompany} from "../warehouse-company";
import {WarehouseCompanyService} from "../warehouse-company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {User} from "../../user/user";
declare var $: any;

@Component({
  selector: 'app-warehouse-company-create',
  templateUrl: './warehouse.company.create.component.html',
  styleUrls: ['./warehouse.company.create.component.scss'],
  providers: [WarehouseCompanyService]
})
export class WarehouseCompanyCreateComponent implements OnInit {
  id: number;
  warehouseCompany = new WarehouseCompany;
  user: User=new User;

  constructor(private companyService: WarehouseCompanyService, private router:Router, private route:ActivatedRoute){
    console.log("CHECKED from created component");
    route.params.subscribe(params => { this.id = params['id']; });
    if(!isUndefined(this.id)) {
      console.log("id  determined");
      this.companyService.getCompanyById(this.id).subscribe(data => {
        this.warehouseCompany = data[0];
      });
    }
  }

  registration(warehouseCompany: WarehouseCompany){
    console.log(warehouseCompany);
    this.companyService.save(warehouseCompany).subscribe(data => {
      this.user.id = data.id;
      this.user.login = data.login;
      this.user.password = data.password;
      console.log(this.user);
    });
    if(isUndefined(this.id)) this.router.navigate(['../'], {relativeTo: this.route});
    else this.router.navigate(['../../'], {relativeTo: this.route});
  }

  ngOnInit(){
    console.log("registration page redirect");
    $("body").foundation();
  }
}
