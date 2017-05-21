import {Component, OnInit, Input } from '@angular/core';
import {ActSearchDTO} from "../actSearchDTO";
import {ActSearchService} from "./act-search.service";
import {actTypeMessages} from "../act.module";

@Component({
  selector: 'app-act-search',
  templateUrl: './act-search.component.html',
  styleUrls: ['./act-search.component.scss']
})
export class ActSearchComponent implements OnInit {
  @Input() private actTypeNames;
  private searchDTO:ActSearchDTO;
  private actTypeMessages = actTypeMessages;

  constructor(private actSearchService:ActSearchService) {
    this.searchDTO = new ActSearchDTO();

  }

  ngOnInit() {
  }

  private search() {
    this.actSearchService.doSearch(this.searchDTO);
  }

  private clear() {
    this.searchDTO = new ActSearchDTO();
    this.actSearchService.doSearch(this.searchDTO);
  }

}
