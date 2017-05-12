import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TransportCompanyListComponent} from "./tr-company-list/tr-company-list.component";
import {TransportCompanyService} from "./tr-company.service";

export const transportCompanyRoutes: Routes = [
  {
    path: '',
    component: TransportCompanyListComponent
  }
];


@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [TransportCompanyListComponent],
  providers: [TransportCompanyService]
})
export class TransportCompanyModule { }
