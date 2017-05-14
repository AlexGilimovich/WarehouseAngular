import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user-service.service";
import {rolesMessages} from "../user.module";
import { Router, ActivatedRoute } from "@angular/router";
import {Role} from "../role";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private users:User[];
  private rolesMessages = rolesMessages;
  private roles: Role[];


  //pagination
  private itemsOnPageArray = [10, 20];
  private currentPage:number = 1;
  private itemsOnPage:number = this.itemsOnPageArray[0];
  private totalItemsCount;
  private pageArray;
  private totalPageCount;
  private displayedPageCount = 7;//constant: number of pages in pagination

  private selectedUsers:User[] = [];

  constructor(private userService:UserService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.list(this.currentPage, this.itemsOnPage).subscribe(
      (res) => {
        this.users = res.users;
        this.totalItemsCount = res.count;
        this.totalPageCount = Math.ceil(this.totalItemsCount / this.itemsOnPage);
        let pages = this.totalPageCount < this.displayedPageCount ? this.totalPageCount : this.displayedPageCount;
        this.pageArray = Array(this.totalPageCount < pages ? this.totalPageCount : pages).fill(this.currentPage).map((e, i)=> {
          if (e < Math.ceil(pages / 2) + 1) {
            return i + 1;
          } else if (e < this.totalPageCount - Math.floor(pages / 2))
            return e - Math.floor(pages / 2) + i;
          else
            return this.totalPageCount - (pages - 1) + i;
        }).filter(val=>val > 0);
      },
      (err:any) => {
        console.error(err);
      }
    );
    this.userService.getRoles().subscribe(
      (res) => {
        this.roles = res;
      },
      (err)=> {
        console.error(err);
      }
    )
  }

  private getPage(page:number) {
    this.userService.list(page, this.itemsOnPage).subscribe(
      (res) => {
        this.users = res.users;
        this.totalItemsCount = res.count;
        this.totalPageCount = Math.ceil(this.totalItemsCount / this.itemsOnPage);
        this.displayedPageCount = this.totalPageCount < this.displayedPageCount ? this.totalPageCount : this.displayedPageCount;
        this.pageArray = Array(this.totalPageCount < this.displayedPageCount ? this.totalPageCount : this.displayedPageCount).fill(this.currentPage).map((e, i)=> {
          if (e < Math.ceil(this.displayedPageCount / 2) + 1) {
            return i + 1;
          } else if (e < this.totalPageCount - Math.floor(this.displayedPageCount / 2))
            return e - Math.floor(this.displayedPageCount / 2) + i;
          else
            return this.totalPageCount - (this.displayedPageCount - 1) + i;
        }).filter(val=>val > 0);
      },
      (err:any) => {
        console.error(err);
      }
    );
  }

  private goToDetails(id:string):void {
    this.router.navigate(['../details', id], {relativeTo: this.route});
  }

  private addToSelected(e, user:User) {
    if (e.target.checked)
      this.selectedUsers.push(user);

  }

  private addAllToSelected(e) {
    if (e.target.checked)

      this.selectedUsers.concat(this.users);
  }

  private isSelected(user:User) {
    return this.selectedUsers.includes(user);
  }

}
