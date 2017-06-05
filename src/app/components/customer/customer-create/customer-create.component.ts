import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompany} from "../customer";
import {WarehouseCustomerCompanyService} from "../customer.service";
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";

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
              private formBuiler: FormBuilder,
              private location: Location) {
    this.customerForm = formBuiler.group({
      'name': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\s\d]*$/)])]
    });
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    const customer = this.customerService.mapCustomerFromForm(form);
    this.customerService.save(customer).subscribe(success => {
      this.location.back();
    });
  }

}
