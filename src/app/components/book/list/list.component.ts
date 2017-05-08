import { Component, OnInit } from '@angular/core';
import { Book } from "../book";
import { BookService } from "../book-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ShoppingCartService } from "../../shopping-cart/shopping-cart.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService,
              private shoppingCartService: ShoppingCartService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  goToBook(sku: String): void {
    this.router.navigate(['../details', sku], {
      relativeTo: this.route
    });
  }

  addToCart(book: Book): void {
    this.shoppingCartService.addToCart(book);
  }

  ngOnInit() {
    this.bookService.list().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
