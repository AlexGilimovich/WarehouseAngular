import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WarehouseCustomerCompany} from "../customer";
import {WarehouseCustomerCompanyService} from "../customer.service";

@Component({
  selector: 'app-customer-choice',
  templateUrl: './customer-choice.component.html',
  styleUrls: ['./customer-choice.component.scss'],
  providers: [WarehouseCustomerCompanyService]
})
export class CustomerChoiceComponent implements OnInit {
  customers: WarehouseCustomerCompany[];
  chosenCustomer: WarehouseCustomerCompany;
  @Output('customer') customer = new EventEmitter<WarehouseCustomerCompany>();

  constructor(private customerService: WarehouseCustomerCompanyService) { }

  ngOnInit() {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
    });
  }

  refreshCustomers(searchParams: string) {
    this.customerService.search(searchParams).subscribe(data => {
      this.customers = data;
    });
  }

  onCustomerChosen(customer: WarehouseCustomerCompany) {
    this.chosenCustomer = customer;
  }

  saveCustomer() {
    this.customer.emit(this.chosenCustomer);
  }

}
