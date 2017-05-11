import { Component, OnInit } from '@angular/core';
import {roles} from "../user.module";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  private roles = roles;
  constructor() { }

  ngOnInit() {
  }

}
