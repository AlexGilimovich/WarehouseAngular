import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;
  cartItems: number;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.cartItems = 0;
    this.subscription = shoppingCartService.cartItems$.subscribe(
      books => {
        this.cartItems = books.length;
      });
  }

  ngOnInit() {
  }

}
