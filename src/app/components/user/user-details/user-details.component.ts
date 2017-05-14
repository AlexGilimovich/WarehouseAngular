import { Component, OnInit } from '@angular/core';
import {Warehouse} from "../../warehouse/warehouse";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from "../user-service.service";
import {User} from "../user";
import {rolesMessages} from "../user.module";
import {Role} from "../role";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private currentUser:User;
  private id:number;
  private rolesMessages = rolesMessages;
  //private roles: Role[];
  private roles:any[];

  //todo mock warehouses:
  private warehouseList:Warehouse[] = [
    new Warehouse(1, "ALPHA"),
    new Warehouse(2, "BETA"),
    new Warehouse(3, "GAMMA"),
    new Warehouse(10, "LAMBDA")
  ];

  constructor(//private warehouseService: WarehouseService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute) {

    route.params.subscribe(params => {
      this.id = params['id'];
    });

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
      (currentUser:User) => {
        this.currentUser = currentUser;
        this.userService.getRoles().subscribe(
          (res) => {
            this.roles = new Array();
            res.forEach(
              role=> {
                if (this.currentUser.hasRole(role)) {
                  this.roles.push({role: role, checked: true});
                } else {
                  this.roles.push({role: role, checked: false});
                }
              }
            )
          },
          (err)=> {
            console.error(err);
          }
        )
      },
      (err:any) => {
        console.log(err);
      }
    );


  }

  private updateRole(role, event) {
    role.checked = event.target.checked;

  }


  private save() {
    this.roles.forEach(role=> {
      if (role.checked) {
        this.currentUser.addRole(role.role);
      } else {
        this.currentUser.removeRole(role.role)
      }

    })
    this.userService.save(this.currentUser);
    this.router.navigateByUrl('dispatcher/user/list');
  }

  private changeWarehouse(event) {
    this.currentUser.warehouse = event.target.value;
  }


}
