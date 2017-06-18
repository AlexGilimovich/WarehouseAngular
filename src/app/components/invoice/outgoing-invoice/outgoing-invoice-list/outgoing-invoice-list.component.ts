import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../../invoice.service";
import {OutgoingInvoice} from "../outgoing-invoice";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../login/login.service";
import {invoiceStatuses, notificationContent, notificationTitle} from "../../invoice.module";
import {NotificationsService} from "angular2-notifications/dist";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-outgoing-invoice-list',
  templateUrl: './outgoing-invoice-list.component.html',
  styleUrls: ['./outgoing-invoice-list.component.scss'],
  providers: [InvoiceService, NotificationsService]
})
export class OutgoingInvoiceListComponent implements OnInit {
  invoices: OutgoingInvoice[] = [];
  invoiceStatuses: Map<string, string>;

  notificationOptions = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(private invoiceService: InvoiceService,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.invoiceStatuses = invoiceStatuses;
    this.invoiceService.getAllOutgoing().subscribe(data => {
      this.invoices = data;
    });
    this.receiveInvoicesUpdates();
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

  private receiveInvoicesUpdates() {
    Observable
      .interval(10000)
      .flatMap(() => {
        return this.invoiceService.getAllOutgoing();
      })
      .subscribe(data => {
        this.notifyAboutNewInvoices(data.length);
        this.invoices = data;
      });
  }

  private notifyAboutNewInvoices(newDataLength: number) {
    const oldDataLength = this.invoices.length;
    if (oldDataLength !== newDataLength) {
      this.createNotification();
    }
  }

  private createNotification() {
    this.notificationService.info(
      notificationTitle,
      notificationContent
    );
  }

}
