import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {ActService} from "../act.service";
import {Act} from "../act";

@Component({
  selector: 'app-act-list',
  templateUrl: './act-list.component.html',
  styleUrls: ['./act-list.component.scss']
})
export class ActListComponent implements OnInit {
  private acts:Act[];
  //pagination
  private itemsOnPageArray = [10, 20];
  private currentPage:number = 1;
  private itemsOnPage:number = this.itemsOnPageArray[0];
  private totalItemsCount;
  private pageArray;
  private totalPageCount;
  private displayedPageCount = 7;//constant: number of pages in pagination

  private selectedActs:Act[] = [];

  constructor(private actService:ActService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.actService.list(this.currentPage, this.itemsOnPage).subscribe(
      (res) => {
        this.acts = res.acts;
        this.totalItemsCount = res.count;
        this.totalPageCount = Math.ceil(this.totalItemsCount / this.itemsOnPage);
        let pages = this.totalPageCount < this.displayedPageCount ? this.totalPageCount : this.displayedPageCount;
        this.pageArray = Array(this.totalPageCount < pages ? this.totalPageCount : pages).fill(this.currentPage).map((e, i)=> {
          if (e < Math.ceil(pages / 2) + 1) {
            return i + 1;
          } else if (e < this.totalPageCount - Math.floor(pages / 2))
            return e - Math.floor(pages / 2) + i;
          else
            return this.totalPageCount - (pages - 1) + i;
        }).filter(val=>val > 0);
      },
      (err:any) => {
        console.error(err);
      }
    );
  }

  private getPage(page:number) {
    this.actService.list(page, this.itemsOnPage).subscribe(
      (res) => {
        this.acts = res.acts;
        this.totalItemsCount = res.count;
        this.totalPageCount = Math.ceil(this.totalItemsCount / this.itemsOnPage);
        this.displayedPageCount = this.totalPageCount < this.displayedPageCount ? this.totalPageCount : this.displayedPageCount;
        this.pageArray = Array(this.totalPageCount < this.displayedPageCount ? this.totalPageCount : this.displayedPageCount).fill(this.currentPage).map((e, i)=> {
          if (e < Math.ceil(this.displayedPageCount / 2) + 1) {
            return i + 1;
          } else if (e < this.totalPageCount - Math.floor(this.displayedPageCount / 2))
            return e - Math.floor(this.displayedPageCount / 2) + i;
          else
            return this.totalPageCount - (this.displayedPageCount - 1) + i;
        }).filter(val=>val > 0);
      },
      (err:any) => {
        console.error(err);
      }
    );
  }

  private goToDetails(id:string):void {
    this.router.navigate(['../details', id], {relativeTo: this.route});
  }

  private addToSelected(e, act:Act) {
    if (e.target.checked)
      this.selectedActs.push(act);

  }

  private addAllToSelected(e) {
    if (e.target.checked)
      this.selectedActs.concat(this.acts);
  }

  private isSelected(act:Act) {
    return this.selectedActs.includes(act);
  }

}
