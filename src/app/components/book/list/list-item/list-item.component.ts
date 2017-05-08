import { Component, OnInit, Input } from '@angular/core';
import {Book} from "../../book";


@Component({
  selector: 'list-item',
  templateUrl: 'list-item.component.html',
  styleUrls: ['list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

}
