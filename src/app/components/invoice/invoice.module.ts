import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IncomingInvoiceCreateComponent} from "./incoming-invoice/incoming-invoice-create/incoming-invoice-create.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const invoiceRoutes: Routes = [
  {
    path: 'incoming/new',
    component: IncomingInvoiceCreateComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IncomingInvoiceCreateComponent]
})
export class InvoiceModule { }
