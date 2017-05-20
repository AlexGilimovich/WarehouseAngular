import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ActSearchDTO} from "../actSearchDTO";
import {actTypeMessages} from "../act.module";

@Injectable()
export class ActSearchService {

  private searchSource = new Subject<ActSearchDTO>();
  searchDTO$ = this.searchSource.asObservable();
  private actTypeMessages = actTypeMessages;


  constructor() {
  }

  public doSearch(searchDTO:ActSearchDTO):void {
    this.searchSource.next(searchDTO);
  }


}
