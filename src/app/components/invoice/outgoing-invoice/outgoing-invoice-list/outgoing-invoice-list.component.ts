import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../../invoice.service";
import {OutgoingInvoice} from "../outgoing-invoice";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../login/login.service";
import {invoiceStatuses} from "../../invoice.module";

@Component({
  selector: 'app-outgoing-invoice-list',
  templateUrl: './outgoing-invoice-list.component.html',
  styleUrls: ['./outgoing-invoice-list.component.scss'],
  providers: [InvoiceService]
})
export class OutgoingInvoiceListComponent implements OnInit {
  invoices: OutgoingInvoice[] = [];
  invoiceStatuses: Map<string, string>;

  constructor(private invoiceService: InvoiceService,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.invoiceStatuses = invoiceStatuses;
    this.invoiceService.getAllOutgoing().subscribe(data => {
      this.invoices = data;
    });
  }

  createOutgoingInvoice() {
    this.router.navigate(['../../outgoing/new'], {relativeTo: this.route});
  }

  goToDetails(id: number) {
    this.router.navigate(['../../outgoing/', id], {relativeTo: this.route});
  }

  delete(invoice: OutgoingInvoice) {
    this.invoiceService.delete(invoice.id).subscribe(success => {
      this.invoices = this.invoiceService.removeOutgoingInvoiceFromArray(this.invoices, invoice);
    });
  }

  isManager() {
    return this.loginService.getLoggedUser().hasRole('ROLE_MANAGER');
  }

}
