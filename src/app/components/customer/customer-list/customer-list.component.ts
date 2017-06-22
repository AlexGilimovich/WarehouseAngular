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
  addresses: string[] = [];
  mapView: MapView = new MapView(this.mapService);

  constructor(private customerService: WarehouseCustomerCompanyService,
              private mapService: MapService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
      for(let i=0; i< this.customers.length; i++) {
        this.getAddressForCustomer(i, this.customers[i]);
      }
      this.mapView.init(data);
    });
  }

  getAddressForCustomer(index: number, customer: WarehouseCustomerCompany) {
    this.mapService.getAddress(customer.x, customer.y, function(str){
      this.customers[index].address = str;
    }.bind(this));
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
