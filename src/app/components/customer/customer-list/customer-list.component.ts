import {Component, OnInit, ViewChild} from '@angular/core';
import {WarehouseCustomerCompany} from "../customer";
import {WarehouseCustomerCompanyService} from "../customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SebmGoogleMap} from 'angular2-google-maps/core';
import {MapView} from "../../../util/map";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [WarehouseCustomerCompanyService],
})
export class CustomerListComponent implements OnInit {
  customers: WarehouseCustomerCompany[] = [];
  mapView: MapView = new MapView;

  constructor(private customerService: WarehouseCustomerCompanyService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
      this.mapView.init(data);
      console.log(data);
      console.log(this.mapView.isDataAvailable);
      console.log(this.mapView.markers);
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['../', id], {relativeTo: this.route});
  }

  createCustomer() {
    this.router.navigate(['../new'], {relativeTo: this.route});
  }

  delete(customer: WarehouseCustomerCompany) {
    this.customerService.delete(customer.id).subscribe(success => {
      this.customers = this.customerService.removeCustomerFromArray(this.customers, customer);
    });
  }

}
