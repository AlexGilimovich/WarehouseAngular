import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
import {DispatcherComponent} from "./dispatcher.component";
import {DispatcherDesktopComponent} from "./dispatcher-desktop/dispatcher-desktop.component";
import {UserContainerComponent} from "../user/user-container/user-container.component";
import {GoodsContainerComponent} from "../goods/goods-container/goods-container.component";
import {ActContainerComponent} from "../act/act-container/act-container.component";
import {GoodsModule, goodsRoutes} from "../goods/goods.module";
import {ActModule, actRoutes} from "../act/act.module";
import {UserModule, userRoutes} from "../user/user.module";
import {GoodsCreateComponent} from "../goods/goods-create/goods-create.component";
import {GoodsListContainerComponent} from "../goods/goods-list-container/goods-list-container.component";

export const dispatcherRoutes:Routes = [
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
  }
];

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    RouterModule,
    ActModule,
    GoodsModule
  ],
  declarations: [DispatcherComponent, DispatcherDesktopComponent],
  exports: [
    GoodsCreateComponent,
    GoodsListContainerComponent]

})


export class DispatcherModule {
}
