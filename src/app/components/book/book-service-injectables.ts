import {
  BookService,
  LIST_URL,
  GET_URL
} from './book-service.service';

export const bookServiceInjectables: Array<any> = [
  {provide: BookService, useClass: BookService},
  {provide: LIST_URL, useValue: LIST_URL},
  {provide: GET_URL, useValue: GET_URL}
];
