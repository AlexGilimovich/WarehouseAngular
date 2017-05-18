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
  customer = new WarehouseCustomerCompany;

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
    const customer = this.mapCustomerFromForm(form);
    console.log(customer);
    this.customerService.save(customer).subscribe(success => {
      this.router.navigateByUrl('customer');
    });
  }

  private mapCustomerFromForm(form: FormGroup): WarehouseCustomerCompany {
    const customer = new WarehouseCustomerCompany();
    customer.name = form.controls['name'].value;
    return customer;
  }

}
