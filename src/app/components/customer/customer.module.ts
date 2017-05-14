import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import {RouterModule, Routes} from "@angular/router";

export const customerRoutes: Routes = [
  {
    path: 'new',
    component: CustomerCreateComponent
  }
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [CustomerCreateComponent]
})
export class WarehouseCustomerCompanyModule { }
