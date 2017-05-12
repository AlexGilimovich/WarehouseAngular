import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TransportCompanyListComponent} from "./tr-company-list/tr-company-list.component";
import {TransportCompanyService} from "./tr-company.service";
import { TransportCompanyCreateComponent } from './tr-company-create/tr-company-create.component';

export const transportCompanyRoutes: Routes = [
  {
    path: '',
    component: TransportCompanyListComponent
  },
  {
    path: 'new',
    component: TransportCompanyCreateComponent
  }
];


@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [TransportCompanyListComponent, TransportCompanyCreateComponent],
  providers: [TransportCompanyService]
})
export class TransportCompanyModule { }
