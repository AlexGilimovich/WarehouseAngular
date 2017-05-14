import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActContainerComponent } from './act-container/act-container.component';
import { ActDetailsComponent } from './act-details/act-details.component';
import { ActListComponent } from './act-list/act-list.component';
import { ActCreateComponent } from './act-create/act-create.component';
import {GoodsDetailsComponent} from "../goods/goods-details/goods-details.component";
import {GoodsContainerComponent} from "../goods/goods-container/goods-container.component";
import {GoodsCreateComponent} from "../goods/goods-create/goods-create.component";
import { Routes, RouterModule } from "@angular/router";

export const actRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'list',
    "pathMatch": 'full'
  }, {
    "path": "details/:id",
    "component": ActDetailsComponent
  }, {
    "path": "list",
    "component": ActContainerComponent
  }, {
    "path": "create",
    "component": ActCreateComponent
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations: [ActContainerComponent, ActDetailsComponent, ActListComponent, ActCreateComponent]
})
export class ActModule { }
