import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GoodsContainerComponent} from './goods-container/goods-container.component';
import {GoodsDetailsComponent} from './goods-details/goods-details.component';
import {GoodsListComponent} from './goods-list/goods-list.component';
import {GoodsCreateComponent} from './goods-create/goods-create.component';
import {Routes, RouterModule} from "@angular/router";
import {GoodsListContainerComponent} from './goods-list-container/goods-list-container.component';
import {GoodsStatusName} from "./goodsStatusName";
import {Unit} from "./unit";
import {GoodsService} from "./goods.service";
import {GoodsStatusSearchComponent} from './goods-status-search/goods-status-search.component';
import {GoodsSearchComponent} from './goods-search/goods-search.component';

// export const statuses:GoodsStatusName[] = [
//   new GoodsStatusName("REGISTERED", "Зарегистрирован"),
//   new GoodsStatusName("CHECKED", "Проверка завершена"),
//   new GoodsStatusName("STORED", "Принят на хранение"),
//   new GoodsStatusName("LOST_BY_TRANSPORT_COMPANY", "Утерян перевозчиком"),
//   new GoodsStatusName("LOST_BY_WAREHOUSE_COMPANY", "Утерян со склада"),
//   new GoodsStatusName("STOLEN", "Кража со склада"),
//   new GoodsStatusName("TRANSPORT_COMPANY_MISMATCH", "Недостача перевозчика"),
//   new GoodsStatusName("SEIZED", "Конфискован"),
//   new GoodsStatusName("RECYCLED", "Утилизирован"),
//   new GoodsStatusName("WITHDRAWN", "Снят с хранения"),
//   new GoodsStatusName("RELEASE_ALLOWED", "Выпуск разрешен"),
//   new GoodsStatusName("MOVED_OUT", "Вывезен со склада"),
//
// ]
//
// export const statusMap:Map<string, GoodsStatusName> = new Map([
//   ["REGISTERED", statuses[0]],
//   ["CHECKED", statuses[1]],
//   ["STORED", statuses[2]],
//   ["LOST_BY_TRANSPORT_COMPANY", statuses[3]],
//   ["LOST_BY_WAREHOUSE_COMPANY", statuses[4]],
//   ["STOLEN", statuses[5]],
//   ["TRANSPORT_COMPANY_MISMATCH", statuses[6]],
//   ["SEIZED", statuses[7]],
//   ["RECYCLED", statuses[8]],
//   ["WITHDRAWN", statuses[9]],
//   ["RELEASE_ALLOWED", statuses[10]],
//   ["MOVED_OUT", statuses[11]]
// ]);

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


// export const units:Unit[] = [
//   new Unit("UNIT_KILOGRAM", "кг"),
//   new Unit("UNIT_LITER", "л"),
//   new Unit("UNIT_METER", "м"),
//   new Unit("UNIT_SQUARE_METER", "м2"),
//   new Unit("UNIT_CUBIC_METER", "м3"),
//   new Unit("UNIT_BARREL", "бочка"),
//   new Unit("UNIT_PACK", "уп"),
//   new Unit("UNIT_PIECE", "шт"),
//   new Unit("UNIT_BYN", "руб"),
//   new Unit("UNIT_USD", "долл"),
//   new Unit("UNIT_TON", "т"),
//   new Unit("MOVED_OUT", "Вывезен со склада")
//
// ]
// export const unitMap:Map<string, Unit> = new Map([
//   ["UNIT_KILOGRAM", units[0]],
//   ["UNIT_LITER", units[1]],
//   ["UNIT_METER", units[2]],
//   ["UNIT_SQUARE_METER", units[3]],
//   ["UNIT_CUBIC_METER", units[4]],
//   ["UNIT_BARREL", units[5]],
//   ["UNIT_PACK", units[6]],
//   ["UNIT_PIECE", units[7]],
//   ["UNIT_BYN", units[8]],
//   ["UNIT_USD", units[9]],
//   ["UNIT_TON", units[10]],
//   ["MOVED_OUT", units[11]]
// ]);


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


// export const storageTypes:Unit[] = [
//   new Unit("HEATED_PLACE", "Отапливаемое помещение"),
//   new Unit("UNHEATED_PLACE", "Неотапливаемое помещение"),
//   new Unit("COOLING_CHAMBER", "Холодильная камера"),
//   new Unit("OPEN_SPACE", "Открытая площадка"),
//   new Unit("FREEZING_CHAMBER", "Камера глубокой заморозки"),
// ]
//
// export const storageTypesMap:Map<string, Unit> = new Map([
//   ["HEATED_PLACE", units[0]],
//   ["UNHEATED_PLACE", units[1]],
//   ["COOLING_CHAMBER", units[2]],
//   ["OPEN_SPACE", units[3]],
//   ["FREEZING_CHAMBER", units[4]],
//
// ]);


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
    "path": "details/:id",
    "component": GoodsDetailsComponent
  }, {
    "path": "list",
    "component": GoodsListContainerComponent
  }, {
    "path": "create",
    "component": GoodsCreateComponent
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule
  ],
  declarations: [GoodsContainerComponent, GoodsDetailsComponent, GoodsListComponent, GoodsCreateComponent, GoodsListContainerComponent, GoodsStatusSearchComponent, GoodsSearchComponent],
  providers: [GoodsService]
})
export class GoodsModule {
}
