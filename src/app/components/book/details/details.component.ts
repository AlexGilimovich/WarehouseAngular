import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../book-service.service";
import {Book} from "../book";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  sku: string;
  book: Book;

  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute) {
    route.params.subscribe(params => { this.sku = params['id']; });
  }

  goToBook(sku: String): void {
    this.router.navigate(['../list'], {
      relativeTo: this.route
    });
  }

  ngOnInit() {
    this.bookService.get(this.sku).subscribe(
      (book: Book) => {
        console.log(book);
        this.book = book;
      },
      (err: any) => {
        console.log(err);
      }
    );

  }

}
