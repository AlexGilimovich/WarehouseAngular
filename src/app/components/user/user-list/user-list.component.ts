import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from "../user-service.service";
import {rolesMessages} from "../user.module";
import {Router, ActivatedRoute} from "@angular/router";
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
  private sortingDirection = "UP";

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
        this.handleUserListResponse(res);
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
      (res:any) => {
        this.handleUserListResponse(res);
      },
      (err:any) => {
        console.error(err);
      }
    );
  }

  private handleUserListResponse(res:any):void {
    res.users.forEach(
      user=> {
        this.users.push({"user": user, "selected": false});
      }
    );
    this.totalItemsCount = res.count;
    this.paginate();
  }

  private paginate():void {
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
      case "lastName":
        this.sortStrings("lastName");
        break;
      case "firstName":
        this.sortStrings("firstName");
        break;
      case "patronymic":
        this.sortStrings("patronymic");
        break;
      case "warehouse":
        this.sortStrings("warehouse", "name");
        break;
      case "role":
        if (this.sortingDirection == "UP")
          this.sortStrings("roles", "0", "role");
        break;
      default:
        break;
    }
    if (this.sortingDirection == "UP")
      this.sortingDirection = "DOWN"
    else this.sortingDirection = "UP"
  }


  private sortStrings(...name:string[]):void {
    if (this.sortingDirection == "UP") {
      this.users.sort((current, next)=> {
        let c = current.user;
        let n = next.user;
        name.forEach((item:string)=> {
          c = c ? c[item] : '';
          n = n ? n[item] : '';
        })
        return c.toLowerCase().localeCompare(n.toLowerCase());
      });
    }
    else {
      this.users.sort((current, next)=> {
        let c = current.user;
        let n = next.user;
        name.forEach((item:string)=> {
          c = c ? c[item] : '';
          n = n ? n[item] : '';
        })
        return n.toLowerCase().localeCompare(c.toLowerCase());
      });
    }
  }


}
