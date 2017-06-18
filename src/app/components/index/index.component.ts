import {Component, OnInit} from '@angular/core';
import {marker} from "../google-map/marker";
import {WarehouseCompanyService} from "../warehouse-company/warehouse-company.service";
import {User} from "../user/user";
import {LoginService} from "../login/login.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Role} from "../user/role";
import {MapView} from "../google-map/map";
import {MapService} from "../google-map/map.service";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [WarehouseCompanyService, MapService]
})
export class IndexComponent implements OnInit {
  map: MapView = new MapView(this.mapService);
  googleMapData: any[] = [];

  constructor(private companyService:WarehouseCompanyService,
              private loginService:LoginService,
              private mapService: MapService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.companyService.getAllCompany().subscribe(data => {
      this.googleMapData = data;
      this.map.init(data);
     });
  }
  private login():void{
    let user:User = this.loginService.checkLocalStorage();
    if (user) {
      this.loginService.login(user.login, user.password, true).subscribe(
        res=> {
          this.navigate(user.roles);
        },
        error=> {
          this.router.navigate(['../login'], {
            relativeTo: this.route
          });
        }
      );
    } else{
      this.router.navigate(['../login'], {
        relativeTo: this.route
      });
    }
  }

  private navigate(roles:Role[]):void {
    this.router.navigate(['../desktop'], {
      relativeTo: this.route
    });
  }

}
