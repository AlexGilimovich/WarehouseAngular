import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompanyService} from "../customer.service";
import {Router, ActivatedRoute, Params } from "@angular/router";
import {WarehouseCustomerCompany} from "../customer";
import {customerRedirectUrl} from "../customer.module";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  providers: [WarehouseCustomerCompanyService]
})
export class CustomerDetailsComponent implements OnInit {
  customer: WarehouseCustomerCompany;

  constructor(private customerService: WarehouseCustomerCompanyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.customerService.getById(id).subscribe(data => {
      this.customer = data;
    });
  }

  onSubmit(customer: WarehouseCustomerCompany) {
    this.customerService.update(customer).subscribe(success => {
      this.router.navigateByUrl(customerRedirectUrl);
    });
  }

}
