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

const routes: Routes = [
  {
    "path": "",
    "redirectTo": "home",
    "pathMatch": "full"
  }, {
    "path": "home",
    "component": HomeComponent
  }, {
    "path": "book",
    "component": BookContainerComponent,
    "children": bookRoutes
  },
  {
    "path": "cart",
    "component": ShoppingCartComponent
  }, {
    "path": "about",
    "component": AboutComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    CartFormComponent,
    BookContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BookModule
  ],
  providers: [
    {"provide": APP_BASE_HREF, "useValue": "/"},
    {"provide": LocationStrategy, "useClass": HashLocationStrategy},
    bookServiceInjectables,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
