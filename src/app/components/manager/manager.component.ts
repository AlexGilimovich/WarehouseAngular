import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {LoginService} from "../login/login.service";
declare var $:any;

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerComponent implements OnInit {

  private currentPage:string = 'user';

  constructor(private router:Router,
              private route:ActivatedRoute,
              private loginService:LoginService) {

  }

  ngOnInit() {
    $("body").foundation();
  }

  private navigateToPage(page:string) {
    switch (page) {
      // case 'user':
      //   this.router.navigate(['./user'], {
      //     relativeTo: this.route
      //   });
      //   this.currentPage = 'user';
      //   break;
      case 'goods':
        this.router.navigate(['./goods'], {
          relativeTo: this.route
        });
        this.currentPage = 'goods';
        break;
      case 'act':
        this.router.navigate(['./act'], {
          relativeTo: this.route
        });
        this.currentPage = 'act';
        break;
      case 'invoice':
        this.router.navigate(['./invoice'], {
          relativeTo: this.route
        });
        this.currentPage = 'invoice';
        break;
      case 'warehouse':
        this.router.navigate(['./warehouse', this.loginService.getLoggedUser().warehouse.idWarehouse], {
          relativeTo: this.route
        });
        this.currentPage = 'warehouse';
        break;
      default:
        break;
    }

  }
}
