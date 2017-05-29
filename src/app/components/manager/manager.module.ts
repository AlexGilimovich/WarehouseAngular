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
import {FinanceComponent} from "../finance/finance.component";
import {UserContainerComponent} from "../user/user-container/user-container.component";
import {userRoutes, UserModule} from "../user/user.module";
import {warehouseSchemeRoutes} from "../warehouse-scheme/warehouse-scheme.module";

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
  {
    "path": "user",
    "component": UserContainerComponent,
    "children": userRoutes
  },
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
    "path": "warehousecompany/:id/warehouse",
    "component": WarehouseComponent
  },
  {
    path: 'warehousecompany/:id/warehouse/:id_warehouse/scheme',
    children: warehouseSchemeRoutes
  },
  // {
  //   "path": "invoice",
  //   "component": InvoiceComponent
  // },
  {
    "path": "finance",
    "component": FinanceComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ActModule,
    GoodsModule,
    UserModule,
    HeaderModule
  ],
  declarations: [ManagerComponent, ManagerDesktopComponent],
  exports: []

})


export class ManagerModule {
}
