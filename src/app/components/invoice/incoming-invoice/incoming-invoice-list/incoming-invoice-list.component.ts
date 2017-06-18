import {Component, OnInit} from '@angular/core';
import {IncomingInvoice} from '../incoming-invoice';
import {InvoiceService} from '../../invoice.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../../login/login.service';
import {Role} from '../../../user/role';
import {invoiceStatuses, notificationContent, notificationTitle} from '../../invoice.module';
import {Observable} from 'rxjs/Observable';
import {NotificationsService} from 'angular2-notifications/dist';

@Component({
  selector: 'app-incoming-invoice-list',
  templateUrl: './incoming-invoice-list.component.html',
  styleUrls: ['./incoming-invoice-list.component.scss'],
  providers: [InvoiceService, LoginService, NotificationsService]
})
export class IncomingInvoiceListComponent implements OnInit {
  invoices: IncomingInvoice[] = [];
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
    this.invoiceService.getAllIncoming().subscribe(data => {
      this.invoices = data;
    });
    this.receiveInvoicesUpdates();
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

  private receiveInvoicesUpdates() {
    Observable
      .interval(10000)
      .flatMap(() => {
        return this.invoiceService.getAllIncoming();
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
