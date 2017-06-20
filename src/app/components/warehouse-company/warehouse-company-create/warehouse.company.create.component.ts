/**
 * Created by Lenovo on 15.05.2017.
 */
import {Component, OnInit} from '@angular/core';
import {WarehouseCompany} from "../warehouse-company";
import {WarehouseCompanyService} from "../warehouse-company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isUndefined} from "util";
import {User} from "../../user/user";
import {MapService} from "../../google-map/map.service";
import {MapView} from "../../google-map/map";
import {NotificationService} from "../../notification/notification.service";
declare var $: any;

@Component({
  selector: 'app-warehouse-company-create',
  templateUrl: './warehouse.company.create.component.html',
  styleUrls: ['./warehouse.company.create.component.scss'],
  providers: [WarehouseCompanyService, MapService]
})
export class WarehouseCompanyCreateComponent implements OnInit {
  id: number;
  warehouseCompany = new WarehouseCompany;
  user: User = new User;
  emailAddress: string;
  isRegistration: boolean;
  map: MapView = new MapView(this.mapService);
  address: string;

  constructor(private companyService: WarehouseCompanyService,
              private mapService: MapService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService) {
    mapService.mapItems$.subscribe(data => {
      this.mapService.getAddress(this.map.getX(), this.map.getY(), this.setAddress.bind(this));
    });
  }

  checkout() {
    this.map.getCoordByAddress(this.address, this.setAddress.bind(this));
  }

  setAddress(address: string) {
    this.address = address;
  }

  registration(warehouseCompany: WarehouseCompany) {
    warehouseCompany.x = this.map.getX();
    warehouseCompany.y = this.map.getY();
    if (isUndefined(this.id)) {
      this.companyService.save(warehouseCompany, this.emailAddress).subscribe(data => {
        //console.log(this.user);
      });
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      this.companyService.save(warehouseCompany, this.emailAddress).subscribe(data => {
        this.notificationService.warehouseCompanyCreated();
        this.router.navigate(['../../'], {relativeTo: this.route});
      });
    }
  }

  back() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  ngOnInit() {
    $("body").foundation();
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (!isUndefined(this.id)) {
      this.isRegistration = false;
      this.companyService.getCompanyById(this.id).subscribe(data => {
        this.warehouseCompany = data[0];
        this.map.setOneCoordinate(this.warehouseCompany.x, this.warehouseCompany.y);
        this.mapService.getAddress(this.warehouseCompany.x, this.warehouseCompany.y, this.setAddress.bind(this));
      });
    } else {
      this.isRegistration = true;
    }
  }
}
