import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user-service.service";
import {User} from "../user";
import {roles} from "../user.module"
import {rolesMap} from "../user.module";
import {Warehouse} from "../../warehouse/warehouse";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private currentUser:User;
  private id:number;

  //todo mock warehouses:
  private warehouseList:Warehouse[] = [
    new Warehouse(1,"ALPHA"),
    new Warehouse(2,"BETA"),
    new Warehouse(3,"GAMMA"),
    new Warehouse(10,"LAMBDA")
  ];
  private roles = roles;
  private rolesMap = rolesMap;

  constructor(//private warehouseService: WarehouseService,
              private userService:UserService,
              private router:Router,
              private route:ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });

  }

  ngOnInit() {
    //this.warehouseService.list().subscribe(
    //  (warehouseList: Warehouse[]) => {
    //    this.warehouseList = warehouseList;
    //  },
    //  (err: any) => {
    //    console.log(err);
    //  }
    //);

    this.userService.get(this.id).subscribe(
      (currentUser: User) => {
        this.currentUser = currentUser;
      },
      (err: any) => {
        console.log(err);
      }
    );

  }

  private save() {
    this.userService.save(this.currentUser);
    this.router.navigate(['./']);
  }

  private cancel() {
    this.router.navigate(['./']);
  }



}
