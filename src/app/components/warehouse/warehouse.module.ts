/**
 * Created by Lenovo on 13.05.2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WarehouseComponent} from "./warehouse-list/warehouse.component";
import {WarehouseService} from "./warehouse.service";

export const warehouseRoutes: Routes = [
  {
    path: '',
    component: WarehouseComponent
  }
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [WarehouseComponent],
  providers: [WarehouseService]
})
export class WarehouseModule { }
