import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsContainerComponent } from './goods-container/goods-container.component';
import { GoodsDetailsComponent } from './goods-details/goods-details.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodsCreateComponent } from './goods-create/goods-create.component';
import { Routes, RouterModule } from "@angular/router";

export const goodsRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'list',
    "pathMatch": 'full'
  }, {
    "path": "details/:id",
    "component": GoodsDetailsComponent
  }, {
    "path": "list",
    "component": GoodsContainerComponent
  }, {
    "path": "create",
    "component": GoodsCreateComponent
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations: [GoodsContainerComponent, GoodsDetailsComponent, GoodsListComponent, GoodsCreateComponent]
})
export class GoodsModule { }
