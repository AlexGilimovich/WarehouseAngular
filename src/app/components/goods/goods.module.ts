import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoodsContainerComponent} from "./goods-container/goods-container.component";
import {GoodsDetailsComponent} from "./goods-details/goods-details.component";
import {GoodsCreateComponent} from "./goods-create/goods-create.component";
import {Routes, RouterModule} from "@angular/router";
import {GoodsService} from "./goods.service";
import {StatusHistoryComponent} from "./status-history/status-history.component";
import {GoodsActsComponent} from "./goods-acts/goods-acts.component";
import {WarehouseSchemeInfoComponent} from "../warehouse-scheme/warehouse-scheme-info/warehouse.scheme.component";
import {GoodsListModule} from "./goods-list/goods-list.module";
import {GoodsListContainerComponent} from "./goods-list/goods-list-container/goods-list-container.component";

export const statusMessages:Map<string, string> = new Map([
  ["REGISTERED", "Зарегистрирован"],
  ["CHECKED", "Проверка завершена"],
  ["STORED", "Принят на хранение"],
  ["LOST_BY_TRANSPORT_COMPANY", "Утерян перевозчиком"],
  ["LOST_BY_WAREHOUSE_COMPANY", "Утерян со склада"],
  ["STOLEN", "Кража со склада"],
  ["TRANSPORT_COMPANY_MISMATCH", "Недостача перевозчика"],
  ["SEIZED", "Конфискован"],
  ["RECYCLED", "Утилизирован"],
  ["WITHDRAWN", "Снят с хранения"],
  ["RELEASE_ALLOWED", "Выпуск разрешен"],
  ["MOVED_OUT", "Вывезен со склада"],
]);


export const unitMessages:Map<string, string> = new Map([
  ["UNIT_KILOGRAM", "кг"],
  ["UNIT_LITER", "л"],
  ["UNIT_METER", "м"],
  ["UNIT_SQUARE_METER", "м2"],
  ["UNIT_CUBIC_METER", "м3"],
  ["UNIT_BARREL", "бочка"],
  ["UNIT_PACK", "уп"],
  ["UNIT_PIECE", "шт"],
  ["UNIT_BYN", "руб"],
  ["UNIT_USD", "долл"],
  ["UNIT_TON", "т"],
  ["MOVED_OUT", "Вывезен со склада"]
]);


export const storageTypeMessages:Map<string, string> = new Map([
  ["HEATED_PLACE", "Отапливаемое помещение"],
  ["UNHEATED_PLACE", "Неотапливаемое помещение"],
  ["COOLING_CHAMBER", "Холодильная камера"],
  ["OPEN_SPACE", "Открытая площадка"],
  ["FREEZING_CHAMBER", "Камера глубокой заморозки"],
]);

export const goodsRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'list',
    "pathMatch": 'full'
  }, {
    // "path": "details/:warehouseId/:id",
    "path": "details/:id",
    "component": GoodsDetailsComponent
  }, {
    "path": "list",
    "component": GoodsListContainerComponent
  }, {
    "path": "create",
    "component": GoodsCreateComponent
  }, {
    "path": "typespace/:id_type/warehouse/:id_warehouse/put",
    "component": WarehouseSchemeInfoComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GoodsListModule],
  declarations: [
    GoodsContainerComponent,
    GoodsDetailsComponent,
    // GoodsListComponent,
    GoodsCreateComponent,
    // GoodsListContainerComponent,
    // GoodsStatusSearchComponent,
    // GoodsSearchComponent,
    StatusHistoryComponent,
    GoodsActsComponent],
  providers: [
    GoodsService
    ],


})
export class GoodsModule {
}
