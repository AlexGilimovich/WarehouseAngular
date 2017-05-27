import { Component, OnInit } from '@angular/core';
import {IncomingInvoice} from "../incoming-invoice";
import {InvoiceService} from "../../invoice.service";

@Component({
  selector: 'app-incoming-invoice-list',
  templateUrl: './incoming-invoice-list.component.html',
  styleUrls: ['./incoming-invoice-list.component.scss'],
  providers: [InvoiceService]
})
export class IncomingInvoiceListComponent implements OnInit {
  invoices: IncomingInvoice[] = [];

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.invoiceService.getAllIncoming().subscribe(data => {
       this.invoices = data;
    });
  }

  delete(invoice: IncomingInvoice) {
    this.invoiceService.delete(invoice.id).subscribe(success => {
      this.invoices = this.invoiceService.removeIncomingInvoiceFromArray(this.invoices, invoice);
    });
  }

}
