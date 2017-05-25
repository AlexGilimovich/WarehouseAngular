import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OwnerComponent} from "./owner.component";
import {HeaderModule} from "../header/header.module";
import {Routes, RouterModule} from "@angular/router";
import {WarehouseCompanyComponent} from "../warehouse-company/warehouse-company-list/warehouse.company.component";
import { OwnerDesktopComponent } from './owner-desktop/owner-desktop.component';

export const ownerRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'company',
    "pathMatch": 'full'
  }, {
    "path": "company",
    "component": WarehouseCompanyComponent
  }
  // ,
  // {
  //   "path": "report",
  //   "component": ReportsComponent
  // },

];

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    RouterModule,
    HeaderModule
  ],
  declarations: [OwnerComponent, OwnerDesktopComponent]
})
export class OwnerModule {
}
