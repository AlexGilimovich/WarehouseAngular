import { Component, OnInit } from '@angular/core';
import {Warehouse} from "../../../entity/warehouse";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user-service.service";
import {User} from "../user";
import {roles} from "../user.module"

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private currentUser:User;
  private id:number;
  private warehouseList:Warehouse[] = [];
  private roles = roles;

  constructor(//private warehouseService: WarehouseService,
              private userService:UserService,
              private router:Router,
              private route:ActivatedRoute) {
    //route.params.subscribe(params => { this.id = params['id']; });

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

    //this.userService.get(this.id).subscribe(
    //  (currentUser: User) => {
    //    console.log(currentUser);
    //    this.currentUser = currentUser;
    //  },
    //  (err: any) => {
    //    console.log(err);
    //  }
    //);

  }

  private save(user:User) {
    this.userService.save(user);
    this.router.navigate(['./']);
  }

  private cancel() {
    this.router.navigate(['./']);
  }


}
