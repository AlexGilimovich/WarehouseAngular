/**
 * Created by Lenovo on 13.05.2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WarehouseCompanyComponent} from "./warehouse-company-list/warehouse.company.component";
import {WarehouseCompanyService} from "./warehouse-company.service";

export const warehouseCompanyRoutes: Routes = [
  {
    path: '',
    component: WarehouseCompanyComponent
  }
];


@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [WarehouseCompanyComponent],
  providers: [WarehouseCompanyService]
})
export class WarehouseCompanyModule { }
