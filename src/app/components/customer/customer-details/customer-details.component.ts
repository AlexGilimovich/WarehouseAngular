import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompanyService} from "../customer.service";
import {Router, ActivatedRoute, Params } from "@angular/router";
import {WarehouseCustomerCompany} from "../customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {MapService} from "../../google-map/map.service";
import {MapView} from "../../google-map/map";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  providers: [WarehouseCustomerCompanyService, MapService]
})
export class CustomerDetailsComponent implements OnInit {
  customerForm: FormGroup;
  id: number;
  map: MapView = new MapView(this.mapService);
  address: string;

  constructor(private customerService: WarehouseCustomerCompanyService,
              private mapService: MapService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private location: Location) {
    this.customerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required])],
      'address': ['']
    });

    mapService.mapItems$.subscribe(data => {
      this.mapService.getAddress(this.map.getX(), this.map.getY(), this.setAddress.bind(this));
    });
  }

  ngOnInit() {
    this.id = this.customerService.parseIdParam(this.route);
    this.customerService.getById(this.id).subscribe(data => {
      const customer = data;
      this.customerForm.controls['name'].setValue(customer.name);
      this.map.setOneCoordinate(customer.x, customer.y);
      this.mapService.getAddress(customer.x, customer.y, this.setAddress.bind(this));
      /*this.customerForm.controls['x'].setValue(customer.x);
      this.customerForm.controls['y'].setValue(customer.y);*/
    });
  }

  checkout(){
    this.map.getCoordByAddress(this.address, this.setAddress.bind(this));
  }

  setAddress(address: string){
    this.customerForm.controls['address'].setValue(address);
  }

  onSubmit(form: FormGroup) {
    const customer = this.customerService.mapCustomerFromForm(form, this.id);
    customer.x = this.map.getX();
    customer.y = this.map.getY();
    this.customerService.update(customer).subscribe(success => {
      this.location.back();
    });
  }

}
