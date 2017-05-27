import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../../invoice.service";
import {OutgoingInvoice} from "../outgoing-invoice";

@Component({
  selector: 'app-outgoing-invoice-list',
  templateUrl: './outgoing-invoice-list.component.html',
  styleUrls: ['./outgoing-invoice-list.component.scss'],
  providers: [InvoiceService]
})
export class OutgoingInvoiceListComponent implements OnInit {
  invoices: OutgoingInvoice[] = [];

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.invoiceService.getAllOutgoing().subscribe(data => {
      this.invoices = data;
    });
  }

  delete(invoice: OutgoingInvoice) {
    this.invoiceService.delete(invoice.id).subscribe(success => {
      this.invoices = this.invoiceService.removeOutgoingInvoiceFromArray(this.invoices, invoice);
    });
  }

}
