import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { LoginService } from './components/login/login.service';
import { HttpAuthService } from './components/login/httpAuth.service';
import { TransportCompanyModule, transportCompanyRoutes } from './components/tr-company/tr-company.module';
import { WarehouseCompanyComponent } from './components/warehouse-company/warehouse-company-list/warehouse.company.component';
import { customerRoutes, WarehouseCustomerCompanyModule } from './components/customer/customer.module';
import { InvoiceModule, invoiceRoutes } from './components/invoice/invoice.module';
import { warehouseCompanyRoutes } from './components/warehouse-company/warehouse-company.module';
import { warehouseRoutes } from './components/warehouse/warehouse.module';
import { warehouseSchemeRoutes } from './components/warehouse-scheme/warehouse-scheme.module';
import { WarehouseCompanyCreateComponent } from './components/warehouse-company/warehouse-company-create/warehouse.company.create.component';
import { WarehouseCreateComponent } from './components/warehouse/warehouse-create/warehouse.create.component';
import { WarehouseComponent } from './components/warehouse/warehouse-list/warehouse.component';
import { WarehouseService } from './components/warehouse/warehouse.service';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FinanceModule } from './components/finance/finance.module';
import { ChartsModule } from 'ng2-charts';
import { SpinnerModule } from 'angular2-spinner/dist';
import { DesktopComponent } from './components/desktop/desktop.component';
import { DesktopModule, desktopRoutes } from './components/desktop/desktop.module';
import { Ng2Webstorage } from 'ng2-webstorage/dist/app';
import { EmailComponent } from './components/email/email.component';
import { EmailService } from './components/email/email.service';
import { Uploader } from 'angular2-http-file-upload';
import { SettingsComponent } from './components/settings/settings.component';

const globalRoutes: Routes = [
  {
    "path": "",
    "redirectTo": "index",
    "pathMatch": "full"
  },
  {
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
    path: "desktop",
    component: DesktopComponent,
    children: desktopRoutes
  }


];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    WarehouseCompanyComponent,
    WarehouseCompanyCreateComponent,
    WarehouseComponent,
    WarehouseCreateComponent,
    EmailComponent,
    SettingsComponent,
    // WarehouseSchemeInfoComponent,
    // WarehouseSpaceComponent,
    // WarehouseCellComponent
    //CustomerCreateComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB8C9_ZetYZUMduJ2TOXBkHr8yulXfo1WU'
    }),
    Ng2Webstorage,
    ChartsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(globalRoutes),
    //WarehouseModule,
    TransportCompanyModule,
    WarehouseCustomerCompanyModule,
    InvoiceModule,
    FinanceModule,
    SpinnerModule,
    DesktopModule
  ],
  providers: [
    {"provide": APP_BASE_HREF, "useValue": "/"},
    {"provide": LocationStrategy, "useClass": HashLocationStrategy},
    LoginService,
    HttpAuthService,
    WarehouseService,
    EmailService,
    Uploader
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
