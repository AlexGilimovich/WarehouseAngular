import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActContainerComponent } from './act-container/act-container.component';
import { ActDetailsComponent } from './act-details/act-details.component';
import { ActListComponent } from './act-list/act-list.component';
import { ActCreateComponent } from './act-create/act-create.component';
import {GoodsDetailsComponent} from "../goods/goods-details/goods-details.component";
import {GoodsContainerComponent} from "../goods/goods-container/goods-container.component";
import {GoodsCreateComponent} from "../goods/goods-create/goods-create.component";
import { Routes, RouterModule } from "@angular/router";
import {ActListContainerComponent} from "./act-list-container/act-list-container.component";
import {ActTypeName} from "./actTypeName";
import {ActService} from "./act.service";



export const types:ActTypeName[] = [
  new ActTypeName("MISMATCH_ACT", "Акт несоответствия"),
  new ActTypeName("ACT_OF_LOSS", "Акт утери"),
  new ActTypeName("ACT_OF_THEFT", "Акт кражи"),
  new ActTypeName("WRITE_OFF_ACT", "Акт списания"),

]

export const typeMap:Map<string, ActTypeName> = new Map([
  ["MISMATCH_ACT", types[0]],
  ["ACT_OF_LOSS", types[1]],
  ["ACT_OF_THEFT", types[2]],
  ["WRITE_OFF_ACT", types[3]],
]);


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
    "component": ActListContainerComponent
  }, {
    "path": "create",
    "component": ActCreateComponent
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule,  FormsModule
  ],
  declarations: [ActContainerComponent, ActDetailsComponent, ActListComponent, ActCreateComponent, ActListContainerComponent],
  providers: [ActService]
})
export class ActModule { }
