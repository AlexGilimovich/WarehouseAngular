import { Component, OnInit } from '@angular/core';
import {Warehouse} from "../../warehouse/warehouse";
import { Router, ActivatedRoute } from "@angular/router";
import {UserService} from "../user-service.service";
import {User} from "../user";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Role} from "../role";
import {rolesMessages} from "../user.module";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  private roles: Role[];
  private user = new User();
  private rolesMessages = rolesMessages;

  //todo mock warehouses:
  private warehouseList:Warehouse[] = [
    new Warehouse(1, "ALPHA"),
    new Warehouse(2, "BETA"),
    new Warehouse(3, "GAMMA"),
    new Warehouse(10, "LAMBDA")
  ];

  constructor(private userService:UserService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.getRoles().subscribe(
      (res) => {
        this.roles = res;
      },
      (err)=> {
        console.error(err);
      }
    )
  }

  private save() {
    this.userService.save(this.user);
    this.router.navigate(['./dispatcher/list']);
  }

}
