import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IncomingInvoiceCreateComponent} from "./incoming-invoice/incoming-invoice-create/incoming-invoice-create.component";
import {RouterModule, Routes} from "@angular/router";

export const invoiceRoutes: Routes = [
  {
    path: 'incoming/new',
    component: IncomingInvoiceCreateComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [IncomingInvoiceCreateComponent]
})
export class InvoiceModule { }
