import {Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {GoodsService} from "../../goods.service";
import {GoodsStatusName} from "../../goodsStatusName";
import {Subscription} from "rxjs";
import {statusMessages} from "../../goods.module";
import {GoodsSearchDTO} from "../../goodsSearchDTO";
import {SearchService} from "../goods-search/search.service";
import {Goods} from "../../goods";

declare var $: any;

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit, OnChanges {
  private warehouseId;
  @Input() private goodsList:any[];
  @Input() private statusNames:GoodsStatusName[];
  @Output() private onGetPage = new EventEmitter<any>();
  @Output() private onSearch = new EventEmitter<any>();
  @Output() private onChanged = new EventEmitter<boolean>();
  @Output() private onSelected = new EventEmitter<boolean>();
  @Output() private onAddToSelected = new EventEmitter<Goods>();
  private statusMessages = statusMessages;
  //status which set to all selected goods
  private batchStatus = {name: '', note: ''};

  private searchDTO:GoodsSearchDTO;
  private subscription:Subscription;


  private sortingDirection = "UP";

  @Input() private isEditable = false;
  @Input() private pagination = true;

  //pagination
  @Input() private totalItemsCount:number;

  private itemsOnPageArray = [10, 20];
  private currentPage:number = 1;
  private itemsOnPage:number = this.itemsOnPageArray[0];
  // private totalItemsCount;
  private pageArray;
  private totalPageCount;
  private displayedPageCount = 7;//constant: number of pages in pagination

  constructor(private goodsService:GoodsService,
              private router:Router,
              private route:ActivatedRoute,
              private searchService:SearchService) {
    this.subscription = searchService.searchDTO$.subscribe(
      searchDTO => {
        this.searchDTO = searchDTO;
        this.getPage(1, searchDTO);
      });

    // route.params.subscribe(params => {
    //   this.warehouseId = params['id'];
    // });
    this.warehouseId = 10; //todo route param
  }

  ngOnInit() {
  }

  public addToSelected(goods:Goods) {
    this.onAddToSelected.emit(goods);
  }


  ngOnChanges() {
    if (this.pagination && this.goodsList) {
      this.paginate();
    }
  }

  public getPage(page:number, searchDTO?:GoodsSearchDTO) {
    $('#selectAll').prop('checked', false);
    this.goodsList = [];
    this.currentPage = page;
    if (!searchDTO) {
      if (!this.searchDTO) {
        this.getGoods(page);
      }
      else {
        this.search(this.searchDTO, page);
      }
    } else {
      this.searchDTO = searchDTO;
      this.search(this.searchDTO, page);
    }
  }

  private getGoods(page) {
    this.onGetPage.emit({page: page, itemsOnPage: this.itemsOnPage});
    this.paginate();
  }


  private search(searchDTO:GoodsSearchDTO, page) {
    this.onSearch.emit({searchDTO: searchDTO, page: page, itemsOnPage: this.itemsOnPage});
    this.paginate();
  }

  private paginate():void {
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
  }

  private goToDetails(id:string):void {
    this.router.navigate(['../../goods/details', id], {
      relativeTo: this.route,
      queryParams: {warehouseId: this.warehouseId}
    });
  }


  private statusChangedEvent(e, goods) {
    if (!goods.goods.status && e.target.value) {
      goods.changed = true;
      goods.newStatus.name = e.target.value;
      goods.newStatus.note = '';
      this.onChanged.emit(true);
    } else {
      if (e.target.value == goods.goods.status.name) {
        goods.changed = false;
        goods.newStatus.name = '';
        goods.newStatus.note = '';
      }
      else {
        goods.changed = true;
        goods.newStatus.name = e.target.value;
        goods.newStatus.note = '';
      }
    }
    this.onChanged.emit(this.checkChanges());
  }


  private checkChanges():boolean {
    let hasChanged:boolean = false;
    this.goodsList.forEach(
      item => {
        if (item.changed)
          hasChanged = true;
      }
    )
    return hasChanged;
  }


  private selectAllEvent(e) {
    if (e.target.checked) {
      this.goodsList.forEach(
        goods=> {
          goods.selected = true;
        }
      )
      if (this.goodsList.length > 0)
        this.onSelected.emit(true);
    }
    else {
      this.goodsList.forEach(
        goods=> {
          goods.selected = false;
        }
      )
      if (this.goodsList.length > 0)
        this.onSelected.emit(false);
    }
  }

  private selectOneEvent(e) {
    this.onSelected.emit(e.target.checked);
  }


  public doUpdate() {
    this.goodsService.updateStatuses(this.goodsList.filter(
      item => {
        return item.changed;
      }
    )).subscribe(
      res=> {
        this.onChanged.emit(false);
        this.onSelected.emit(false);
        this.getPage(this.currentPage);
      }
    );
  }

  public cancelChanges() {
    this.goodsList.forEach(
      (item, index)=> {
        item.changed = false;
        item.newStatus.name = '';
        item.newStatus.note = '';
        if (item.goods.status) {
          $(`${'#statusName_'}${index}${' option[value='}${item.goods.status.name}${']'}`).prop('selected', true);
        } else {
          $(`${'#statusName_'}${index}${' option[value=""]'}`).prop('selected', true);
        }
      }
    )
    this.onChanged.emit(false);
  }


  public setStatusOfSelected() {
    this.goodsList.forEach(
      item=> {
        if (item.selected) {
          item.newStatus.name = this.batchStatus.name;
          item.newStatus.note = this.batchStatus.note;
          item.changed = true;
        }
      }
    )
    this.doUpdate();
    $('#statusModal').foundation('close');
  }

  private goToStorageView(goods) {
    if (this.isEditable) {
      this.goodsService.selectedForPuttingGoodsSource.next(goods.goods);
      this.router.navigate(['../typespace', goods.goods.storageType.id, 'warehouse', this.warehouseId, 'put'], {relativeTo: this.route});
    }
  }


  public openStatusModal():void {
    $('#statusModal').foundation('open');
  }

  public closeStatusModal():void {
    $('#statusModal').foundation('close');
  }

  private sort(fieldName:string):void {
    switch (fieldName) {
      case "name":
        debugger;
        this.sortStrings(fieldName);
        break;
      case "storageType":
        this.sortStrings("storageType", "name");
        break;
      case "quantity":
        this.sortNumbers("quantity");
        break;
      case "quantityUnit":
        this.sortStrings("quantityUnit", "name");
        break;
      case "price":
        this.sortNumbers("price");
        break;
      case "priceUnit":
        this.sortStrings("priceUnit", "name");
        break;
      case "weight":
        this.sortNumbers("weight");
        break;
      case "weightUnit":
        this.sortStrings("weightUnit", "name");
        break;
      case "status":
        this.sortStatuses("currentStatus", "name");
        break;
      case "storageCell":
        debugger;
        this.sortNumbers("cells", "0", "number");
        break;

      case "registeredDate":
        this.sortNumbers("registeredStatus", "date");
        break;
      case "registeredDate":
        this.sortNumbers("movedOutStatus", "date");
        break;
      default:
        break;
    }
    if (this.sortingDirection == "UP")
      this.sortingDirection = "DOWN"
    else this.sortingDirection = "UP"
  }


  private sortStatuses(...name:string[]):void {
    if (this.sortingDirection == "UP") {
      this.goodsList.sort((current, next)=> {
        let c = current.goods;
        let n = next.goods;
        name.forEach((item:string)=> {
          c = c ? c[item] : '';
          n = n ? n[item] : '';
        })
        return statusMessages.get(c).toLowerCase().localeCompare(statusMessages.get(n).toLowerCase());
      });
    }
    else {
      this.goodsList.sort((current, next)=> {
        let c = current.goods;
        let n = next.goods;
        name.forEach((item:string)=> {
          c = c ? c[item] : '';
          n = n ? n[item] : '';
        })
        return statusMessages.get(n).toLowerCase().localeCompare(statusMessages.get(c).toLowerCase());
      });
    }
  }

  private sortStrings(...name:string[]):void {
    if (this.sortingDirection == "UP") {
      this.goodsList.sort((current, next)=> {
        let c = current.goods;
        let n = next.goods;
        name.forEach((item:string)=> {
          c = c ? c[item] : '';
          n = n ? n[item] : '';
        })
        return c.toLowerCase().localeCompare(n.toLowerCase());
      });
    }
    else {
      this.goodsList.sort((current, next)=> {
        let c = current.goods;
        let n = next.goods;
        name.forEach((item:string)=> {
          c = c ? c[item] : '';
          n = n ? n[item] : '';
        })
        return n.toLowerCase().localeCompare(c.toLowerCase());
      });
    }
  }

  private sortNumbers(...name:string[]):void {
    if (this.sortingDirection == "UP") {
      this.goodsList.sort((current, next)=> {
        let c = current.goods;
        let n = next.goods;
        name.forEach((item:string)=> {
          c = c ? c[item] : -1;
          n = n ? n[item] : -1;
        })
        return c - n;
      });
    }
    else {
      this.goodsList.sort((current, next)=> {
        let c = current.goods;
        let n = next.goods;
        name.forEach((item:string)=> {
          c = c ? c[item] : -1;
          n = n ? n[item] : -1;
        })
        return n - c;
      });
    }
  }
}
