import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActContainerComponent} from "./act-container/act-container.component";
import {ActDetailsComponent} from "./act-details/act-details.component";
import {ActListComponent} from "./act-list/act-list.component";
import {ActCreateComponent} from "./act-create/act-create.component";
import {Routes, RouterModule} from "@angular/router";
import {ActListContainerComponent} from "./act-list-container/act-list-container.component";
import {ActService} from "./act.service";
import {ActSearchComponent} from "./act-search/act-search.component";
import {ActSearchService} from "./act-search/act-search.service";
import {ActGoodsComponent} from "./act-goods/act-goods.component";
import {GoodsListModule} from "../goods/goods-list/goods-list.module";


export const actTypeMessages:Map<string, string> = new Map([
  ["MISMATCH_ACT", "Акт несоответствия"],
  ["ACT_OF_LOSS", "Акт утери"],
  ["ACT_OF_THEFT", "Акт кражи"],
  ["WRITE_OFF_ACT", "Акт списания"],

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
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, GoodsListModule
  ],
  declarations: [ActContainerComponent, ActDetailsComponent, ActListComponent, ActCreateComponent, ActListContainerComponent, ActSearchComponent, ActGoodsComponent],
  providers: [ActService, ActSearchService]
})
export class ActModule {
}
