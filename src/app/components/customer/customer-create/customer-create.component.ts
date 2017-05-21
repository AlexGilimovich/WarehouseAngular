import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompany} from "../customer";
import {WarehouseCustomerCompanyService} from "../customer.service";
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
  providers: [WarehouseCustomerCompanyService]
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;

  constructor(private customerService: WarehouseCustomerCompanyService,
              private router: Router,
              private formBuiler: FormBuilder) {
    this.customerForm = formBuiler.group({
      'name': ['']
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    const customer = this.customerService.mapCustomerFromForm(form);
    console.log(customer);
    this.customerService.save(customer).subscribe(success => {
      this.router.navigateByUrl('customer');
    });
  }

}
