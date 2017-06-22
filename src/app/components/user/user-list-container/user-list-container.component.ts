import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  private hasSelected:boolean = false;


  constructor() {
  }

  ngOnInit() {
  }

  private remove():void {
    this.userList.removeSelected();
  }

  private onSelected(event) {
    this.hasSelected = event;
  }

}
