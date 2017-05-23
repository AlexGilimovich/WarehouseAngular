import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {ManagerComponent} from "./manager.component";
import {ManagerDesktopComponent} from "./manager-desktop/manager-desktop.component";
import {UserContainerComponent} from "../user/user-container/user-container.component";
import {GoodsContainerComponent} from "../goods/goods-container/goods-container.component";
import {ActContainerComponent} from "../act/act-container/act-container.component";
import {GoodsModule, goodsRoutes} from "../goods/goods.module";
import {ActModule, actRoutes} from "../act/act.module";
import {UserModule, userRoutes} from "../user/user.module";
import {HeaderModule} from "../header/header.module";
import {UserDetailsComponent} from "../user/user-details/user-details.component";

export const managerRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'user',
    "pathMatch": 'full'
  }, {
    "path": "goods",
    "component": GoodsContainerComponent,
    "children": goodsRoutes
  }, {
    "path": "user",
    "component": UserContainerComponent,
    "children": userRoutes
  }, {
    "path": "act",
    "component": ActContainerComponent,
    "children": actRoutes
  },
  {
    "path": "user/details/:id",
    "component": UserDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    UserModule,
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
