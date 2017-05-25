import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {ManagerComponent} from "./manager.component";
import {ManagerDesktopComponent} from "./manager-desktop/manager-desktop.component";
import {GoodsContainerComponent} from "../goods/goods-container/goods-container.component";
import {ActContainerComponent} from "../act/act-container/act-container.component";
import {GoodsModule, goodsRoutes} from "../goods/goods.module";
import {ActModule, actRoutes} from "../act/act.module";
import {HeaderModule} from "../header/header.module";
import {WarehouseComponent} from "../warehouse/warehouse-list/warehouse.component";

export const managerRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'user',
    "pathMatch": 'full'
  }, {
    "path": "goods",
    "component": GoodsContainerComponent,
    "children": goodsRoutes
  },
  // {
  //   "path": "user",
  //   "component": UserContainerComponent,
  //   "children": userRoutes
  // },
  {
    "path": "act",
    "component": ActContainerComponent,
    "children": actRoutes
  },
  // {
  //   "path": "user/details/:id",
  //   "component": UserDetailsComponent
  // },
  {
    "path": "warehouse/:id",
    "component": WarehouseComponent
  },
  // {
  //   "path": "invoice",
  //   "component": InvoiceComponent
  // }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ActModule,
    GoodsModule,
    HeaderModule
  ],
  declarations: [ManagerComponent, ManagerDesktopComponent],
  exports: []

})


export class ManagerModule {
}
