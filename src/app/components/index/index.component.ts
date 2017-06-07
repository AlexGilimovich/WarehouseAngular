import {Component, OnInit} from '@angular/core';
import {marker} from "../../util/marker";
import {WarehouseCompanyService} from "../warehouse-company/warehouse-company.service";
import {User} from "../user/user";
import {LoginService} from "../login/login.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Role} from "../user/role";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [WarehouseCompanyService]
})
export class IndexComponent implements OnInit {
  zoom:number = 5;
  lat:number = 48.152047;
  lng:number = 15.134961;

  isDataAvailable: boolean = false;
  markers: marker[] = [];
  object_marker: marker = new marker;

  constructor(private companyService:WarehouseCompanyService,
              private loginService:LoginService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.companyService.getAllCompany().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].status) {
          this.object_marker = new marker;
          this.object_marker.name = data[i].name;
          this.object_marker.draggable = true;
          this.object_marker.lat = data[i].x;
          this.object_marker.lng = data[i].y;
          this.markers.push(this.object_marker);
        }
      }

      if(data.length != 0){//init first view/coordinates
        this.lat == this.markers[0].lat;
        this.lng == this.markers[0].lng;
      }
      this.isDataAvailable = true;
     console.log(data);
     });
  }

  private login():void {
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
