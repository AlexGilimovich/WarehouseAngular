import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncomingInvoiceCreateComponent} from "./incoming-invoice/incoming-invoice-create/incoming-invoice-create.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IncomingInvoiceDetailsComponent} from './incoming-invoice/incoming-invoice-details/incoming-invoice-details.component';
import {OutgoingInvoiceCreateComponent} from './outgoing-invoice/outgoing-invoice-create/outgoing-invoice-create.component';
import {OutgoingInvoiceDetailsComponent} from './outgoing-invoice/outgoing-invoice-details/outgoing-invoice-details.component';
import {IncomingInvoiceListComponent} from './incoming-invoice/incoming-invoice-list/incoming-invoice-list.component';
import {OutgoingInvoiceListComponent} from './outgoing-invoice/outgoing-invoice-list/outgoing-invoice-list.component';
import {GoodsCreateComponent} from "../goods/goods-create/goods-create.component";
import {GoodsModule} from "../goods/goods.module";
import {GoodsChoiceComponent} from '../goods/goods-choice/goods-choice.component';
import {WarehouseCustomerCompanyModule} from "../customer/customer.module";
import {TransportCompanyModule} from "../tr-company/tr-company.module";
import {InvoiceContainerComponent} from './invoice-container/invoice-container.component';
import {InvoiceService} from "./invoice.service";
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {WarehouseSchemeInfoComponent} from "../warehouse-scheme/warehouse-scheme-info/warehouse.scheme.component";
import {NotificationComponent} from "angular2-notifications/dist/src/simple-notifications/components/notification.component";
import {SimpleNotificationsComponent} from "angular2-notifications/dist/src/simple-notifications/components/simple-notifications.component";
import {MaxPipe} from "angular2-notifications/dist/src/simple-notifications/pipes/max.pipe";


export const invoiceStatuses: Map<string, string> = new Map([
  ["REGISTERED_INCOMING", "Зарегистрирован"],
  ["REGISTERED_OUTGOING", "Зарегистрирован"],
  ["CHECKED", "Проверка завершена"],
  ["COMPLETED", "Оформление завершено"],
  ["RELEASE_ALLOWED", "Выпуск разрешен"],
  ["MOVED_OUT", "Вывоз разрешен"]
]);

export const notificationTitle = 'Информация';
export const notificationContent = 'Доступны новые накладные';

export const invoiceRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: InvoiceListComponent,
    children: [{
      path: '',
      children: [
        {
          path: 'incoming',
          component: IncomingInvoiceListComponent,
          pathMatch: 'full'
        },
        {
          path: 'outgoing',
          component: OutgoingInvoiceListComponent,
          pathMatch: 'full'
        },
      ]
    }]
  },
  {
    path: 'incoming/new',
    component: IncomingInvoiceCreateComponent
  },
  {
    path: 'outgoing/new',
    component: OutgoingInvoiceCreateComponent
  },
  {
    path: 'incoming/:id',
    component: IncomingInvoiceDetailsComponent
  },
  {
    path: 'outgoing/:id',
    component: OutgoingInvoiceDetailsComponent
  },
  {
    path: 'incoming/:id_invoice/warehouse/:id_warehouse/place',
    component: WarehouseSchemeInfoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GoodsModule,
    WarehouseCustomerCompanyModule,
    TransportCompanyModule
  ],
  declarations: [IncomingInvoiceCreateComponent, IncomingInvoiceDetailsComponent,
    OutgoingInvoiceCreateComponent, OutgoingInvoiceDetailsComponent,
    IncomingInvoiceListComponent, OutgoingInvoiceListComponent, InvoiceContainerComponent, InvoiceListComponent,
    NotificationComponent, SimpleNotificationsComponent, MaxPipe],
  entryComponents: [GoodsCreateComponent, GoodsChoiceComponent],
  providers: [InvoiceService]
})
export class InvoiceModule {
}
