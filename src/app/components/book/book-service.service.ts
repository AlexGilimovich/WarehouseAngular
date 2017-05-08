import {
  Injectable,
  Inject
} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Book} from "./book";

export const LIST_URL = "/api/books.json";
export const GET_URL = "/api/book/";

@Injectable()
export class BookService {

  constructor(private http: Http,
              @Inject(LIST_URL) private listUrl: string,
              @Inject(GET_URL) private getUrl: string,) {
  }

  list(): Observable<Book[]> {
    return this.http.get(this.listUrl).map((response: Response) => {
      return (<any>response.json()).map(item => {
        return new Book(
          item.sku,
          item.name,
          item.author,
          item.description,
          item.price
        );
      });
    });
  }

  get(sku: string): Observable<Book> {
    const url = `${this.getUrl}${sku}.json`;
    return this.http.get(url).map((response: Response) => {
      const item = response.json();
      return new Book(
        item.sku,
        item.name,
        item.author,
        item.description,
        item.price
      );
    })
  }
}
