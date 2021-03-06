import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {NotificationsService} from "angular2-notifications/dist";
import {Observable} from "rxjs/Observable";
import {InvoiceService} from "../invoice/invoice.service";

@Injectable()
export class NotificationService {
  private warehouseCompanyCreatedSource = new Subject<any>();
  warehouseCompanyCreated$ = this.warehouseCompanyCreatedSource.asObservable();
  private invoiceCreatedSource = new Subject<any>();
  invoiceCreated$ = this.invoiceCreatedSource.asObservable();
  private invoiceExistsSource = new Subject<any>();
  invoiceExists$ = this.invoiceExistsSource.asObservable();

  constructor(private invoiceService: InvoiceService) {}

  warehouseCompanyCreated() {
    this.warehouseCompanyCreatedSource.next();
  }

  invoiceCreated() {
    this.invoiceCreatedSource.next();
  }

  invoiceExists() {
    this.invoiceExistsSource.next();
  }

  getDesktopNotifications() {
    return Observable
      .interval(10000)
      .flatMap(() => {
        return this.invoiceService.getInvoicesCount();
      });
  }

}
