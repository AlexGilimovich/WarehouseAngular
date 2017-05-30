import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {LoginService} from "../login/login.service";
import {Role} from "../user/role";
import {User} from "../user/user";
import has = Reflect.has;
declare var $:any;

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  private currentPage:string = 'users';
  private user:User;


  constructor(private router:Router,
              private route:ActivatedRoute,
              private loginService:LoginService) {
    this.user = loginService.getLoggedUser();
  }

  ngOnInit() {
    $("body").foundation();
  }


  private hasAnyRole(...roles:string[]):boolean {
    let hasRole = false;
    roles.forEach(
      item=> {
        if (this.user.hasRole(item))
          hasRole = true;
      }
    );
    return hasRole;
  }



  private navigateToPage(page:string) {
    switch (page) {
      case 'users':
        this.router.navigate(['./users'], {relativeTo: this.route});
        this.currentPage = 'users';
        break;
      case 'goods':
        this.router.navigate(['./goods'], {relativeTo: this.route});
        this.currentPage = 'goods';
        break;
      case 'acts':
        this.router.navigate(['./acts'], {relativeTo: this.route});
        this.currentPage = 'acts';
        break;
      case 'invoices':
        this.router.navigate(['./invoices'], {relativeTo: this.route});
        this.currentPage = 'invoices';
        break;
      case 'warehouses':
        this.router.navigate(['./warehousecompany', this.loginService.getLoggedUser().warehouse.idWarehouse, 'warehouse'], {
          relativeTo: this.route
        });
        this.currentPage = 'warehouses';
        break;
      case 'customers':
        this.router.navigate(['./customers'], {relativeTo: this.route});
        this.currentPage = 'customers';
        break;
      case 'reports':
        this.router.navigate(['./reports'], {relativeTo: this.route});
        this.currentPage = 'reports';
        break;
      case 'finances':
        this.router.navigate(['./finances'], {relativeTo: this.route});
        this.currentPage = 'finances';
        break;
      case 'warehouse':
        this.router.navigate(['./warehousecompany', this.loginService.getLoggedUser().warehouse.warehouseCompany.idWarehouseCompany, 'warehouse',this.loginService.getLoggedUser().warehouse.idWarehouse,'scheme'], {relativeTo: this.route});
        this.currentPage = 'warehouse';
        break;
      case 'adminReports':
        this.router.navigate(['./adminReports'], {relativeTo: this.route});
        this.currentPage = 'adminReports';
        break;
      case 'serviceUsers':
        this.router.navigate(['./serviceUsers'], {relativeTo: this.route});
        this.currentPage = 'serviceUsers';
        break;
      case 'transportCompanies':
        this.router.navigate(['./transportCompanies'], {relativeTo: this.route});
        this.currentPage = 'transportCompanies';
        break;
      case 'emails':
        this.router.navigate(['./emails'], {relativeTo: this.route});
        this.currentPage = 'emails';
        break;
      default:
        break;
    }

  }
}
