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
import { OutgoingInvoiceGoodsCreateComponent } from './outgoing-invoice/goods/outgoing-invoice-goods-create/outgoing-invoice-goods-create.component';

export const invoiceRoutes: Routes = [
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
    path: 'incoming/goods/new',
    component: GoodsCreateComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GoodsModule
  ],
  declarations: [IncomingInvoiceCreateComponent, IncomingInvoiceDetailsComponent,
    OutgoingInvoiceCreateComponent, OutgoingInvoiceDetailsComponent,
    IncomingInvoiceListComponent, OutgoingInvoiceListComponent, OutgoingInvoiceGoodsCreateComponent]
})
export class InvoiceModule {
}
