import {Component, OnInit, Input} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {ActService} from "../act.service";
import {Act} from "../act";
import {actTypeMessages} from "../act.module";
import {ActSearchDTO} from "../actSearchDTO";
import {Subscription} from "rxjs";
import {User} from "../../user/user";
import {ActSearchService} from "../act-search/act-search.service";
import {GoodsListContainerComponent} from "../../goods/goods-list-container/goods-list-container.component";

declare var $;

@Component({
  selector: 'app-act-list',
  templateUrl: './act-list.component.html',
  styleUrls: ['./act-list.component.scss']
})
export class ActListComponent implements OnInit {
  private acts:Act[];
  private actTypeMessages = actTypeMessages;
  @Input() private actTypeNames;
  private searchDTO:ActSearchDTO;
  private searchSubscription:Subscription;


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
              private actSearchService:ActSearchService,
              private router:Router,
              private route:ActivatedRoute,
              private user:User) {
    this.searchSubscription = actSearchService.searchDTO$.subscribe(
      searchDTO => {
        this.searchDTO = searchDTO;
        this.getPage(1, searchDTO);
      });
  }


  ngOnInit() {
    $("body").foundation();
    this.actService.list(this.currentPage, this.itemsOnPage).subscribe(
      (res) => {
        this.acts = res.acts.sort((current, next)=> {
          return (new Date(current.date) > new Date(next.date)) ? 1 : -1;
        });
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


  public getPage(page:number, searchDTO?:ActSearchDTO) {
    this.acts = [];
    this.currentPage = page;
    if (!searchDTO) {
      if (!this.searchDTO)
        this.getActs(page);
      else this.search(this.searchDTO, page);
    } else {
      this.searchDTO = searchDTO;
      this.search(this.searchDTO, page);
    }
  }

  private getActs(page) {
    this.actService.list(page, this.itemsOnPage).subscribe(
      (res) => {
        this.acts = res.acts.sort((current, next)=> {
          return (new Date(current.date) > new Date(next.date)) ? 1 : -1;
        });
        this.totalItemsCount = res.count;
        this.totalPageCount = Math.ceil(this.totalItemsCount / this.itemsOnPage);
        let displayedPageCount = this.totalPageCount < this.displayedPageCount ? this.totalPageCount : this.displayedPageCount;
        this.pageArray = Array(this.totalPageCount < displayedPageCount ? this.totalPageCount : displayedPageCount).fill(this.currentPage).map((e, i)=> {
          if (e < Math.ceil(displayedPageCount / 2) + 1) {
            return i + 1;
          } else if (e < this.totalPageCount - Math.floor(displayedPageCount / 2))
            return e - Math.floor(displayedPageCount / 2) + i;
          else
            return this.totalPageCount - (displayedPageCount - 1) + i;
        }).filter(val=>val > 0);
      },
      (err:any) => {
        console.error(err);
      }
    );
  }

  private search(searchDTO:ActSearchDTO, page) {
    this.actService.search(searchDTO, page, this.itemsOnPage).subscribe(
      (res) => {
        this.acts = res.acts;
        this.totalItemsCount = res.count;
        this.totalPageCount = Math.ceil(this.totalItemsCount / this.itemsOnPage);
        let displayedPageCount = this.totalPageCount < this.displayedPageCount ? this.totalPageCount : this.displayedPageCount;
        this.pageArray = Array(this.totalPageCount < displayedPageCount ? this.totalPageCount : displayedPageCount).fill(this.currentPage).map((e, i)=> {
          if (e < Math.ceil(displayedPageCount / 2) + 1) {
            return i + 1;
          } else if (e < this.totalPageCount - Math.floor(displayedPageCount / 2))
            return e - Math.floor(displayedPageCount / 2) + i;
          else
            return this.totalPageCount - (displayedPageCount - 1) + i;
        }).filter(val=>val > 0);
      },
      (err:any) => {
        console.error(err);
      }
    );
  }

  private goToDetails(act: Act):void {
    this.router.navigate(['../details', act.id], {relativeTo: this.route});
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
