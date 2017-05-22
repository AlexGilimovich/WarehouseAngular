import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IncomingInvoiceCreateComponent} from "./incoming-invoice/incoming-invoice-create/incoming-invoice-create.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IncomingInvoiceDetailsComponent } from './incoming-invoice/incoming-invoice-details/incoming-invoice-details.component';

export const invoiceRoutes: Routes = [
  {
    path: 'incoming/new',
    component: IncomingInvoiceCreateComponent
  },
  {
    path: 'incoming/:id',
    component: IncomingInvoiceDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IncomingInvoiceCreateComponent, IncomingInvoiceDetailsComponent]
})
export class InvoiceModule { }
