/**
 * Created by Lenovo on 14.05.2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WarehouseSchemeService} from "./warehouse-scheme.service";
import {WarehouseSchemeInfoComponent} from "./warehouse-scheme-info/warehouse.scheme.component";
import {WarehouseSpaceComponent} from "./warehouse-scheme-create/space/warehouse.space.component";
import {WarehouseCellComponent} from "./warehouse-scheme-create/cell/warehouse.cell.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const warehouseSchemeRoutes: Routes = [
  {
    path: '',
    component: WarehouseSchemeInfoComponent
  },
  {
    path: 'addspace',
    component: WarehouseSpaceComponent
  },
  {
    path: ':id_space/edit',
    component: WarehouseSpaceComponent
  },
  {
    path: ':id_space/cell/:id_cell/edit',
    component: WarehouseCellComponent
  },
  {
    path: ':id_space/cell/add',
    component: WarehouseCellComponent
  },
  {
    path: 'typespace/:id_type/warehouse/:id_warehouse/put',
    component: WarehouseSchemeInfoComponent
  }
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  declarations: [WarehouseSchemeInfoComponent, WarehouseSpaceComponent, WarehouseCellComponent],
  providers: [WarehouseSchemeService]
})
export class WarehouseSchemeModule { }
