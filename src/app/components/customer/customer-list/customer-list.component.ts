import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompany} from "../customer";
import {WarehouseCustomerCompanyService} from "../customer.service";
import {Router} from "@angular/router";
import {ROUTER_PROVIDERS} from "@angular/router/src/router_module";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [WarehouseCustomerCompanyService]
})
export class CustomerListComponent implements OnInit {
  customers: WarehouseCustomerCompany[] = [];
  constructor(private customerService: WarehouseCustomerCompanyService) { }

  ngOnInit() {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
    });
  }

  delete(customer: WarehouseCustomerCompany) {
    this.customerService.delete(customer.id).subscribe(success => {
      this.customers = this.customerService.removeCustomerFromArray(this.customers, customer);
    });
  }

}
