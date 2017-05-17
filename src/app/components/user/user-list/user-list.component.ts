import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  private users:any[] = [];
  private rolesMessages = rolesMessages;
  private roles:Role[];
  @Output() onSelected = new EventEmitter<boolean>();

  //pagination
  private itemsOnPageArray = [10, 20];
  private currentPage:number = 1;
  private itemsOnPage:number = this.itemsOnPageArray[0];
  private totalItemsCount;
  private pageArray;
  private totalPageCount;
  private displayedPageCount = 7;//constant: number of pages in pagination


  constructor(private userService:UserService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.list(this.currentPage, this.itemsOnPage).subscribe(
      (res) => {
        res.users.forEach(
          user=> {
            this.users.push({"user": user, "selected": false});
          }
        );
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
    this.users = [];
    this.currentPage = page;
    this.userService.list(page, this.itemsOnPage).subscribe(
      (res) => {
        res.users.forEach(
          user=> {
            this.users.push({"user": user, "selected": false});
          }
        );
        this.totalItemsCount = res.count;
        this.totalPageCount = Math.ceil(this.totalItemsCount / this.itemsOnPage);
        let displayedPageCount = this.totalPageCount < this.displayedPageCount ? this.totalPageCount : this.displayedPageCount;
        this.pageArray = Array(this.totalPageCount < displayedPageCount ? this.totalPageCount : displayedPageCount).fill(this.currentPage).map((e, i)=> {
          if (e < Math.ceil(displayedPageCount / 2) + 1) {
            return i + 1;
          } else if (e < this.totalPageCount - Math.floor(displayedPageCount / 2))
            return e - Math.floor(displayedPageCount / 2) + i;
          else
            return this.totalPageCount - (displayedPageCount - 1) + i;
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

  public removeSelected() {
    this.userService.remove(this.users.filter(item=> {
      return item.selected
    }).map(
      item=> {
        return item.user;
      }
    )).subscribe(
      res=> {
        this.getPage(this.currentPage);
      }
    )

  }

  private selectAllEvent(e) {
    if (e.target.checked) {
      this.users.forEach(
        user=> {
          user.selected = true;
        }
      )
      if (this.users.length > 0)
        this.onSelected.emit(true);
    }
    else {
      this.users.forEach(
        user=> {
          user.selected = false;
        }
      )
      if (this.users.length > 0)
      this.onSelected.emit(false);
    }
  }

  private selectOneEvent(e) {
    this.onSelected.emit(e.target.checked);
  }

  private sort(fieldName:string) {
    switch (fieldName) {
      //todo sorting
      case "lasName":
        break;
      default:
        break;
    }
  }


}
