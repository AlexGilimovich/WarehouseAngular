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
import {UserContainerComponent} from "./components/user/user-container/user-container.component";
import {UserService} from "./components/user/user-service.service";
import {LoginService} from "./components/login/login.service";
import {HttpAuthService} from "./components/login/httpAuth.service";
import {transportCompanyRoutes} from "./components/tr-company/tr-company.module";
import {customerRoutes} from "./components/customer/customer.module";
import {TransportCompanyListComponent} from "./components/tr-company/tr-company-list/tr-company-list.component";
import {TransportCompanyCreateComponent} from "./components/tr-company/tr-company-create/tr-company-create.component";
import {DispatcherModule, dispatcherRoutes} from "./components/dispatcher/dispatcher.module";
import {DispatcherComponent } from "./components/dispatcher/dispatcher.component";
import {CustomerCreateComponent} from "./components/customer/customer-create/customer-create.component";
import {invoiceRoutes} from "./components/invoice/invoice.module";
import {IncomingInvoiceCreateComponent} from "./components/invoice/incoming-invoice/incoming-invoice-create/incoming-invoice-create.component";


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
    path: 'customer',
    children: customerRoutes
  },
  {
    path: 'invoice',
    children: invoiceRoutes
  },
  {
    "path": "dispatcher",
    "component": DispatcherComponent,
    "children": dispatcherRoutes
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
    TransportCompanyListComponent,
    TransportCompanyCreateComponent,
    CustomerCreateComponent,
    IncomingInvoiceCreateComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(globalRoutes),
    BookModule,
    DispatcherModule
  ],
  providers: [
    {"provide": APP_BASE_HREF, "useValue": "/"},
    {"provide": LocationStrategy, "useClass": HashLocationStrategy},
    bookServiceInjectables,
    ShoppingCartService,
    LoginService,
    HttpAuthService,


  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
