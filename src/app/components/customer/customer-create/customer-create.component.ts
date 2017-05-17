import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompany} from "../customer";
import {WarehouseCustomerCompanyService} from "../customer.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
  providers: [WarehouseCustomerCompanyService]
})
export class CustomerCreateComponent implements OnInit {
  customer = new WarehouseCustomerCompany;

  constructor(private customerService: WarehouseCustomerCompanyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(customer: WarehouseCustomerCompany) {
    this.customerService.save(customer).subscribe(success => {
      const redirectUrl = 'customer';
      this.router.navigateByUrl(redirectUrl);
    });
  }

}
