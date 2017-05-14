import { Component, OnInit } from '@angular/core';
import {IncomingInvoice} from "../incoming-invoice";
import {InvoiceService} from "../../invoice.service";
import {TransportCompanyService} from "../../../tr-company/tr-company.service";
import {WarehouseCustomerCompanyService} from "../../../customer/customer.service";
import {TransportCompany} from "../../../tr-company/tr-company";
import {WarehouseCustomerCompany} from "../../../customer/customer";

@Component({
  selector: 'app-incoming-invoice-create',
  templateUrl: './incoming-invoice-create.component.html',
  styleUrls: ['./incoming-invoice-create.component.scss'],
  providers: [InvoiceService, TransportCompanyService, WarehouseCustomerCompanyService]
})
export class IncomingInvoiceCreateComponent implements OnInit {
  invoice = new IncomingInvoice;
  transportCompanies: TransportCompany[];
  supplierCompanies: WarehouseCustomerCompany[];

  constructor(private invoiceService: InvoiceService,
              private transportService: TransportCompanyService,
              private customerService: WarehouseCustomerCompanyService) {}

  ngOnInit() {
    this.transportService.getAll().subscribe(data => {
      this.transportCompanies = data;
    });
    this.customerService.getAll().subscribe(data => {
      this.supplierCompanies = data;
    });
    this.invoice.dispatcher = this.invoiceService.getLoggedUser();
  }

  onSubmit(invoice: IncomingInvoice){
    this.invoiceService.saveIncomingInvoice(invoice).subscribe(data => {
      console.log(data);
    });
  }

}
