import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import {RouterModule, Routes} from "@angular/router";
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomerChoiceComponent } from './customer-choice/customer-choice.component';
import { CustomerContainerComponent } from './customer-container/customer-container.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'new',
    component: CustomerCreateComponent
  },
  {
    path: ':id',
    component: CustomerDetailsComponent
  }
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomerChoiceComponent
  ],
  declarations: [CustomerCreateComponent, CustomerListComponent, CustomerDetailsComponent,
    CustomerChoiceComponent, CustomerContainerComponent]
})
export class WarehouseCustomerCompanyModule { }
