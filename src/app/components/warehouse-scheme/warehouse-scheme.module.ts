/**
 * Created by Lenovo on 14.05.2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WarehouseSchemeService} from "./warehouse-scheme.service";
import {WarehouseSchemeInfoComponent} from "./warehouse-scheme-info/warehouse.scheme.component";

export const warehouseSchemeRoutes: Routes = [
  {
    path: '',
    component: WarehouseSchemeInfoComponent
  }
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [WarehouseSchemeInfoComponent],
  providers: [WarehouseSchemeService]
})
export class WarehouseModule { }
