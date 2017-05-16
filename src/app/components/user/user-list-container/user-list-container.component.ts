import { Component, OnInit, ViewChild } from '@angular/core';
import {UserListComponent} from "../user-list/user-list.component";
import {User} from "../user";

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss'],
})
export class UserListContainerComponent implements OnInit {
  @ViewChild(UserListComponent)
  private userList:UserListComponent;

  constructor() {
  }

  ngOnInit() {
  }

  private remove():void {
    this.userList.removeSelected();
  }

}
