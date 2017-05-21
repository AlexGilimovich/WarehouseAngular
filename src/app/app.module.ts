import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from "@angular/common";
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartFormComponent } from './components/shopping-cart/cart-form/cart-form.component';
import { bookServiceInjectables } from "./components/book/book-service-injectables";
import { BookModule, routes as bookRoutes } from "./components/book/book.module";
import { BookContainerComponent } from './components/book/book-container/book-container.component';
import {ShoppingCartService} from "./components/shopping-cart/shopping-cart.service";
import { LoginComponent } from './components/login/login.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import {IndexComponent} from "./components/index/index.component";
import {LoginService} from "./components/login/login.service";
import {HttpAuthService} from "./components/login/httpAuth.service";
import {TransportCompanyModule, transportCompanyRoutes} from "./components/tr-company/tr-company.module";
import {WarehouseCompanyComponent} from "./components/warehouse-company/warehouse-company-list/warehouse.company.component";
import {WarehouseSchemeInfoComponent} from "./components/warehouse-scheme/warehouse-scheme-info/warehouse.scheme.component";
import {customerRoutes, WarehouseCustomerCompanyModule} from "./components/customer/customer.module";
import {ManagerModule, managerRoutes} from "./components/manager/manager.module";
import {ManagerComponent } from "./components/manager/manager.component";
import {CustomerCreateComponent} from "./components/customer/customer-create/customer-create.component";
import {InvoiceModule, invoiceRoutes} from "./components/invoice/invoice.module";
import {IncomingInvoiceCreateComponent} from "./components/invoice/incoming-invoice/incoming-invoice-create/incoming-invoice-create.component";
import {warehouseCompanyRoutes} from "./components/warehouse-company/warehouse-company.module";
import {warehouseRoutes} from "./components/warehouse/warehouse.module";
import {warehouseSchemeRoutes} from "./components/warehouse-scheme/warehouse-scheme.module";
import {TransportCompanyListComponent} from "./components/tr-company/tr-company-list/tr-company-list.component";
import {TransportCompanyCreateComponent} from "./components/tr-company/tr-company-create/tr-company-create.component";
import {WarehouseCompanyCreateComponent} from "./components/warehouse-company/warehouse-company-create/warehouse.company.create.component";
import {WarehouseCreateComponent} from "./components/warehouse/warehouse-create/warehouse.create.component";
import {WarehouseSpaceComponent} from "./components/warehouse-scheme/warehouse-scheme-create/space/warehouse.space.component";
import {WarehouseCellComponent} from "./components/warehouse-scheme/warehouse-scheme-create/cell/warehouse.cell.component";
import {CustomerListComponent} from "./components/customer/customer-list/customer-list.component";
import {CustomerDetailsComponent} from "./components/customer/customer-details/customer-details.component";
import {WarehouseModule} from "./components/warehouse/warehouse.module";
import {User} from "./components/user/user";
import {WarehouseComponent} from "./components/warehouse/warehouse-list/warehouse.component";
import {WarehouseService} from "./components/warehouse/warehouse.service";
import { AgmCoreModule } from 'angular2-google-maps/core';

const desktopRoutes:Routes = [
  {
    "path": "",
    "redirectTo": "home",
    "pathMatch": "full"
  }, {
    "path": "home",
    "component": HomeComponent,
  }, {
    "path": "book",
    "component": BookContainerComponent,
    "children": bookRoutes,
  },
  {
    "path": "cart",
    "component": ShoppingCartComponent,
  }, {
    "path": "about",
    "component": AboutComponent,
  }
];

const globalRoutes:Routes = [
  {
    "path": "",
    "redirectTo": "index",
    "pathMatch": "full"
  },
  {
    "path": "desktop",
    "component": DesktopComponent,
    "children": desktopRoutes
  }, {
    "path": "login",
    "component": LoginComponent
  }, {
    "path": "index",
    "component": IndexComponent
  }, {
    path: 'tr-company',
    children: transportCompanyRoutes
  },
  {
    path: 'warehousecompany',
    children: warehouseCompanyRoutes
  },
  {
    path: 'warehousecompany/:id',
    children: warehouseRoutes
  },
  {
    path: 'warehousecompany/:id/warehouse/:id_warehouse/scheme',
    children: warehouseSchemeRoutes
  },
  {
    path: 'customer',
    children: customerRoutes
  },
  {
    path: 'invoice',
    children: invoiceRoutes
  },
  {
    "path": "manager",
    "component": ManagerComponent,
    "children": managerRoutes
  }

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DesktopComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    CartFormComponent,
    BookContainerComponent,
    IndexComponent,
    WarehouseCompanyComponent,
    WarehouseCompanyCreateComponent,
    WarehouseComponent,
    WarehouseCreateComponent,
    WarehouseSchemeInfoComponent,
    WarehouseSpaceComponent,
    WarehouseCellComponent,
    //CustomerCreateComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB8C9_ZetYZUMduJ2TOXBkHr8yulXfo1WU'
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(globalRoutes),
    BookModule,
    ManagerModule,
    //WarehouseModule,
    TransportCompanyModule,
    WarehouseCustomerCompanyModule,
    InvoiceModule
  ],
  providers: [
    {"provide": APP_BASE_HREF, "useValue": "/"},
    {"provide": LocationStrategy, "useClass": HashLocationStrategy},
    bookServiceInjectables,
    ShoppingCartService,
    LoginService,
    HttpAuthService,
    User,
    WarehouseService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
