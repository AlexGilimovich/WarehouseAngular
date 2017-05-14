import { Component, OnInit } from '@angular/core';
import {roles} from "../user.module";
import {Warehouse} from "../../../entity/warehouse";
import { Router, ActivatedRoute } from "@angular/router";
import {UserService} from "../user-service.service";
import {User} from "../user";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  private roles = roles;
  private user = new User();
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
  }

  private save() {
    this.userService.save(this.user);
    this.router.navigate(['./dispatcher/list']);
  }

}
