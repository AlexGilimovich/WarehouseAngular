import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user-service.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private page:number=1;
  private count:number=10;
  private users:User[];

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.list(this.page,this.count).subscribe(
      (users: User[]) => {
        console.log(users);
        this.users = users;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
