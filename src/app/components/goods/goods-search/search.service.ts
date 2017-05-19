import {Injectable} from '@angular/core';
import {GoodsSearchDTO} from "../goodsSearchDTO";
import {Subject} from "rxjs";
import {GoodsStatusSearchDTO} from "../goodsStatusSearchDTO";

@Injectable()
export class SearchService {
  private searchSource = new Subject<GoodsSearchDTO>();
  searchDTO$ = this.searchSource.asObservable();

  private removeStatusSource = new Subject<GoodsStatusSearchDTO>();
  removeStatusEvent$ = this.removeStatusSource.asObservable();

  constructor() {
  }

  public doSearch(searchDTO:GoodsSearchDTO):void {
    this.searchSource.next(searchDTO);
  }

  public removeGoodsSearchStatus(status:GoodsStatusSearchDTO) {
    this.removeStatusSource.next(status);
  }


}
