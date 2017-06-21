import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpAuthService} from "./components/login/httpAuth.service";
import {LoginService} from "./components/login/login.service";
import {InvoiceService} from "./components/invoice/invoice.service";
import {NotificationsService} from "angular2-notifications/dist";
import {NotificationService} from "./components/notification/notification.service";
import {init} from "protractor/built/launcher";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService, InvoiceService,
    NotificationsService, NotificationService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  prevInvoicesLength: number;
  curInvoicesLength: number;
  invoiceUpdatesSubscription: Subscription;
  invoiceCreationSubscription: Subscription;
  invoiceExistsSubscription: Subscription;
  warehouseCompanyCreationSubscription: Subscription;
  notificationOptions = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(private loginService: LoginService,
              private invoiceService: InvoiceService,
              private alertService: NotificationsService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.receiveInvoicesUpdates();
    this.receiveWarehouseCompanyCreationUpdates();
    this.receiveInvoiceCreationUpdates();
    this.receiveInvoiceExistsUpdates();
  }

  ngOnDestroy() {
    this.unsubscribeFromDesktopNotifications();
    if (this.warehouseCompanyCreationSubscription != null) {
      this.warehouseCompanyCreationSubscription.unsubscribe();
    }
    if (this.invoiceCreationSubscription != null) {
      this.invoiceCreationSubscription.unsubscribe();
    }
    if (this.invoiceExistsSubscription != null) {
      this.invoiceExistsSubscription.unsubscribe();
    }
  }

  private receiveInvoicesUpdates() {
    this.loginService.userLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.subscribeToDesktopNotifications();
      } else {
        this.unsubscribeFromDesktopNotifications();
      }
    });
  }

  private receiveWarehouseCompanyCreationUpdates() {
    this.warehouseCompanyCreationSubscription = this.notificationService.warehouseCompanyCreated$.subscribe(res => {
      this.alertWarehouseCompanyCreated();
    });
  }

  private receiveInvoiceCreationUpdates() {
    this.invoiceCreationSubscription = this.notificationService.invoiceCreated$.subscribe(invoice => {
      this.alertInvoiceCreated();
    });
  }

  private receiveInvoiceExistsUpdates() {
    this.invoiceExistsSubscription = this.notificationService.invoiceExists$.subscribe(invoice => {
      this.alertInvoiceExists();
    });
  }

  private subscribeToDesktopNotifications() {
    if (this.canHandleInvoices()) {
      const initSubscription = this.invoiceService.getInvoicesCount().subscribe(count => {
        this.prevInvoicesLength = count;
        initSubscription.unsubscribe();
      });
      this.invoiceUpdatesSubscription = this.notificationService.getDesktopNotifications().subscribe(count => {
        this.curInvoicesLength = count;
        this.notifyAboutNewInvoices();
      });
    }
  }

  private unsubscribeFromDesktopNotifications() {
    if (this.invoiceUpdatesSubscription != null) {
      this.invoiceUpdatesSubscription.unsubscribe();
    }
  }

  private notifyAboutNewInvoices() {
    if (this.curInvoicesLength > this.prevInvoicesLength) {
      this.alertInvoiceAvailable();
    }
    this.prevInvoicesLength = this.curInvoicesLength;
  }

  private alertInvoiceAvailable() {
    const notificationTitle = 'Информация';
    const notificationContent = 'Доступны новые накладные';
    this.alertService.info(
      notificationTitle,
      notificationContent
    );
  }

  private alertWarehouseCompanyCreated() {
    const notificationTitle = 'Информация';
    const notificationContent = 'Компания успешно создана!';
    this.alertService.success(
      notificationTitle,
      notificationContent
    );
  }

  private alertInvoiceCreated() {
    const notificationTitle = 'Информация';
    const notificationContent = 'Накладная успешно создана!';
    this.alertService.success(
      notificationTitle,
      notificationContent
    );
  }

  private alertInvoiceExists() {
    const notificationTitle = 'Внимание';
    const notificationContent = 'Накладная с таким номером уже существует!';
    this.alertService.error(
      notificationTitle,
      notificationContent
    );
  }

  private canHandleInvoices() {
    const user = this.loginService.getLoggedUser();
    if (user != null) {
      return user.hasRole('ROLE_DISPATCHER') ||
        user.hasRole('ROLE_CONTROLLER') ||
        user.hasRole('ROLE_MANAGER');
    }
    return false;
  }
}
