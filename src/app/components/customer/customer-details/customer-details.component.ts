import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompanyService} from "../customer.service";
import {Router, ActivatedRoute, Params } from "@angular/router";
import {WarehouseCustomerCompany} from "../customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  providers: [WarehouseCustomerCompanyService]
})
export class CustomerDetailsComponent implements OnInit {
  customerForm: FormGroup;
  id: number;

  constructor(private customerService: WarehouseCustomerCompanyService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private location: Location) {
    this.customerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\s\d]*$/)])]
    });
  }

  ngOnInit() {
    this.id = this.customerService.parseIdParam(this.route);
    this.customerService.getById(this.id).subscribe(data => {
      const customer = data;
      this.customerForm.controls['name'].setValue(customer.name);
    });
  }

  onSubmit(form: FormGroup) {
    const customer = this.customerService.mapCustomerFromForm(form, this.id);
    this.customerService.update(customer).subscribe(success => {
      this.location.back();
    });
  }

}
