import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoodsStatusSearchComponent} from "./goods-status-search/goods-status-search.component";
import {GoodsSearchComponent} from "./goods-search/goods-search.component";
import {GoodsListComponent} from "./list/goods-list.component";
import {SearchService} from "./goods-search/search.service";
import {GoodsListContainerComponent} from "./goods-list-container/goods-list-container.component";
import { ListControlsComponent } from './list-controls/list-controls.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GoodsListContainerComponent,
    GoodsStatusSearchComponent,
    GoodsSearchComponent,
    GoodsListComponent,
  ],
  declarations: [GoodsListContainerComponent,
    GoodsStatusSearchComponent,
    GoodsSearchComponent,
    GoodsListComponent,
    ListControlsComponent,],
  providers: [SearchService]
})
export class GoodsListModule {
}
