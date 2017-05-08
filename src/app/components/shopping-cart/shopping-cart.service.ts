import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Book} from "../book/book";


@Injectable()
export class ShoppingCartService {
  private books: Book[];
  private cartItemsSource = new Subject<Book[]>();

  cartItems$ = this.cartItemsSource.asObservable();

  constructor() {
    this.books = [];
  }

  addToCart(book: Book) {
    this.books.push(book);
    this.cartItemsSource.next(this.books);
  }

  checkout() {
    this.books = [];
    this.cartItemsSource.next(this.books);
  }
}
