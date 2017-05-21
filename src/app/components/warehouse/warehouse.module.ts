/**
 * Created by Lenovo on 13.05.2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WarehouseComponent} from "./warehouse-list/warehouse.component";
import {WarehouseService} from "./warehouse.service";
import {WarehouseCreateComponent} from "./warehouse-create/warehouse.create.component";

export const warehouseRoutes: Routes = [
  {
    path: 'warehouse',
    component: WarehouseComponent
  },
  {
    path: "warehouse/registration",
    component: WarehouseCreateComponent
  },
  {
    path: "warehouse/:id_warehouse/edit",
    component: WarehouseCreateComponent
  }
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [WarehouseComponent, WarehouseCreateComponent],
  providers: [WarehouseService]
})
export class WarehouseModule { }
