import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {GoodsSearchDTO} from "../../goodsSearchDTO";
import {GoodsStatusSearchDTO} from "../../goodsStatusSearchDTO";

@Injectable()
export class SearchService {
  private searchSource = new Subject<GoodsSearchDTO>();
  searchDTO$ = this.searchSource.asObservable();

  private removeStatusSource = new Subject<GoodsStatusSearchDTO>();
  removeStatusEvent$ = this.removeStatusSource.asObservable();

  private dateValiditySource = new Subject<boolean>();
  dateValidationEvent$ = this.dateValiditySource.asObservable();

  constructor() {
  }

  public doSearch(searchDTO:GoodsSearchDTO):void {
    this.searchSource.next(searchDTO);
  }

  public removeGoodsSearchStatus(status:GoodsStatusSearchDTO) {
    this.removeStatusSource.next(status);
  }

  public dateValidationEvent(validity:boolean) {
    this.dateValiditySource.next(validity);
  }


}
