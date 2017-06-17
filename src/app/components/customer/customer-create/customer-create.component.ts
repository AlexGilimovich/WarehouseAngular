import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompany} from "../customer";
import {WarehouseCustomerCompanyService} from "../customer.service";
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {MapService} from "../../../util/map.service";
import {MapView} from "../../../util/map";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
  providers: [WarehouseCustomerCompanyService, MapService]
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  map: MapView = new MapView(this.mapService);
  address: string;

  constructor(private customerService: WarehouseCustomerCompanyService,
              private mapService: MapService,
              private router: Router,
              private formBuiler: FormBuilder,
              private location: Location) {
    this.customerForm = formBuiler.group({
      'name': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\s\d]*$/)])],
      'address': ['']
    });
  }

  ngOnInit() {
  }

  checkout() {
    const address = this.customerForm.controls['address'].value;
    this.map.getCoordByAddress(address);
    console.log(this.map.getX());
  }

  onSubmit(form: FormGroup) {
    const customer = this.customerService.mapCustomerFromForm(form);
    customer.x = this.map.getX();
    customer.y = this.map.getY();
    this.customerService.save(customer).subscribe(success => {
      this.location.back();
    });
  }

}
