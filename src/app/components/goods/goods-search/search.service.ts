import { Injectable } from '@angular/core';
import {GoodsSearchDTO} from "../goodsSearchDTO";
import {Subject} from "rxjs";

@Injectable()
export class SearchService {

  private searchSource = new Subject<GoodsSearchDTO>();
  searchDTO$ = this.searchSource.asObservable();

  constructor() { }

  public doSearch(searchDTO:GoodsSearchDTO): void {
    this.searchSource.next(searchDTO);
  }

}
