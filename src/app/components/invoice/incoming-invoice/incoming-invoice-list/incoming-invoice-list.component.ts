import { Component, OnInit } from '@angular/core';
import {IncomingInvoice} from "../incoming-invoice";
import {InvoiceService} from "../../invoice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../login/login.service";
import {Role} from "../../../user/role";

@Component({
  selector: 'app-incoming-invoice-list',
  templateUrl: './incoming-invoice-list.component.html',
  styleUrls: ['./incoming-invoice-list.component.scss'],
  providers: [InvoiceService, LoginService]
})
export class IncomingInvoiceListComponent implements OnInit {
  invoices: IncomingInvoice[] = [];

  constructor(private invoiceService: InvoiceService,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.invoiceService.getAllIncoming().subscribe(data => {
       this.invoices = data;
    });
  }

  createIncomingInvoice() {
    this.router.navigate(['../../incoming/new'], {relativeTo: this.route});
  }

  goToDetails(id: number) {
    this.router.navigate(['../../incoming/', id], {relativeTo: this.route});
  }

  delete(invoice: IncomingInvoice) {
    this.invoiceService.delete(invoice.id).subscribe(success => {
      this.invoices = this.invoiceService.removeIncomingInvoiceFromArray(this.invoices, invoice);
    });
  }

  isDispatcher() {
    return this.loginService.getLoggedUser().hasRole('ROLE_DISPATCHER');
  }

}
