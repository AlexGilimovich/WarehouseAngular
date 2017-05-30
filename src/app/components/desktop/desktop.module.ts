import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes, RouterModule} from "@angular/router";
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
import {DesktopComponent} from "./desktop.component";
import {WarehouseCompanyComponent} from "../warehouse-company/warehouse-company-list/warehouse.company.component";
import {CustomerListComponent} from "../customer/customer-list/customer-list.component";
import {IncomingInvoiceListComponent} from "../invoice/incoming-invoice/incoming-invoice-list/incoming-invoice-list.component";
import {TransportCompanyListComponent} from "../tr-company/tr-company-list/tr-company-list.component";

export const desktopRoutes:Routes = [
  {
    "path": "",
    "redirectTo": 'users',
    "pathMatch": 'full'
  }, {
    "path": "goods",
    "component": GoodsContainerComponent,
    "children": goodsRoutes
  },
  {
    path: "users",
    component: UserContainerComponent,
    children: userRoutes
  },
  {
    path: "acts",
    component: ActContainerComponent,
    children: actRoutes
  },
  {
    path: "invoices",
    component: IncomingInvoiceListComponent
  },
  {
    path: "warehousecompany/:id/warehouse",
    component: WarehouseComponent
  },
  {
    path: "customers",
    component: CustomerListComponent
  },
  // {
  //   path: "reports",
  //   component: ReportsComponent
  // },
  {
    path: "finances",
    component: FinanceComponent
  },
  {
    path: 'warehousecompany/:id/warehouse/:id_warehouse/scheme',
    children: warehouseSchemeRoutes
  },
  // {
  //   path: "adminReports",
  //   component: ReportsComponent
  // },
  {
    path: "serviceUsers",
    component: WarehouseCompanyComponent
  },
  {
    path: "transportCompanies",
    component: TransportCompanyListComponent
  },
  // {
  //   path: "emails",
  //   component: EmailComponent
  // },
  // {
  //   path: "settings",
  //   component: SettingsComponent
  // }

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
  declarations: [DesktopComponent]
})
export class DesktopModule {
}