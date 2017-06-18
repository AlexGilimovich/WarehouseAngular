import {Component, OnInit} from '@angular/core';
import {WarehouseCustomerCompany} from "../customer";
import {WarehouseCustomerCompanyService} from "../customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MapView} from "../../google-map/map";
import {MapService} from "../../google-map/map.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [WarehouseCustomerCompanyService, MapService],
})
export class CustomerListComponent implements OnInit {
  customers: WarehouseCustomerCompany[] = [];
  mapView: MapView = new MapView(this.mapService);

  constructor(private customerService: WarehouseCustomerCompanyService,
              private mapService: MapService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
      this.mapView.init(data);
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
