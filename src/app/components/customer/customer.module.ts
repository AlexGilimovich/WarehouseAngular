import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import {RouterModule, Routes} from "@angular/router";
import { CustomerListComponent } from './customer-list/customer-list.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
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
  declarations: [CustomerCreateComponent, CustomerListComponent]
})
export class WarehouseCustomerCompanyModule { }
