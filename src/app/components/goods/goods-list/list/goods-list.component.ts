import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {GoodsService} from "../../goods.service";
import {GoodsStatusName} from "../../goodsStatusName";
import {WarehouseService} from "../../../warehouse/warehouse.service";
import {Subscription} from "rxjs";
import {statusMessages} from "../../goods.module";
import {GoodsSearchDTO} from "../../goodsSearchDTO";
import {SearchService} from "../goods-search/search.service";
import {Goods} from "../../goods";

declare var $:any;

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit {
  private warehouseId;
  private goodsList:any[] = [];
  @Input() private statusNames:GoodsStatusName[];
  @Output() private onChanged = new EventEmitter<boolean>();
  @Output() private onSelected = new EventEmitter<boolean>();
  private statusMessages = statusMessages;
  //status which set to all selected goods
  private batchStatus = {name: '', note: ''};

  private searchDTO:GoodsSearchDTO;
  private subscription:Subscription;

  private sortingDirection = "UP";

  @Input() private isEditable = true;
  private isStatusEditable = true;

  //pagination
  private itemsOnPageArray = [10, 20];
  private currentPage:number = 1;
  private itemsOnPage:number = this.itemsOnPageArray[0];
  private totalItemsCount;
  private pageArray;
  private totalPageCount;
  private displayedPageCount = 7;//constant: number of pages in pagination

  constructor(private goodsService:GoodsService,
              private warehouseService:WarehouseService,
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
    $("body").foundation();
    this.goodsService.list(this.warehouseId, this.currentPage, this.itemsOnPage).subscribe(
      (res) => {
        res.goods.forEach(
          goods => {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
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


  public getSelectedGoods():Goods[] {
    return this.goodsList.filter(
      item=> {
        return item.selected;
      }
    ).map(
      item=> {
        return item.goods;
      }
    )
  }

  public getPage(page:number, searchDTO?:GoodsSearchDTO) {
    $('#selectAll').prop('checked', false);
    this.goodsList = [];
    this.currentPage = page;
    if (!searchDTO) {
      if (!this.searchDTO)
        this.getGoods(page);
      else this.search(this.searchDTO, page);
    } else {
      this.searchDTO = searchDTO;
      this.search(this.searchDTO, page);
    }
  }

  private getGoods(page) {
    this.goodsService.list(this.warehouseId, page, this.itemsOnPage).subscribe(
      (res) => {
        res.goods.forEach(
          goods=> {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
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

  private search(searchDTO:GoodsSearchDTO, page) {
    this.goodsService.search(searchDTO, this.warehouseId, page, this.itemsOnPage).subscribe(
      (res) => {
        res.goods.forEach(
          goods=> {
            this.goodsList.push({"goods": goods, "selected": false, "changed": false, "newStatus": {}});
          }
        );
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

  private goToDetails(id:string):void {
    // this.router.navigate(['../details', this.warehouseId, id], {relativeTo: this.route});
    this.router.navigate(['../details', id], {relativeTo: this.route, queryParams: {warehouseId: this.warehouseId}});
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
        if (item.goods.status)
          $(`${'#statusName_'}${index}${' option[value='}${item.goods.status.name}${']'}`).prop('selected', true);
        else
          $(`${'#statusName_'}${index}${' option[value=""]'}`).prop('selected', true);
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
    if (!this.isEditable) return;
    this.router.navigate(['../typespace', goods.goods.storageType.id, 'warehouse', this.warehouseId, 'put'], {relativeTo: this.route});

    // this.warehouseService.selectCells$.subscribe(
    //   cells => {
    //     cells.forEach(
    //       cell=> {
    //         let c = new StorageCell();
    //         c.idStorageCell = cell.idStorageCell;
    //         c.number = cell.number;
    //         goods.goods.cells = [];
    //         goods.goods.cells.push(c);
    //         goods.moved = true;
    //       }
    //     );
    //   }
    // )
    this.putInStorage(goods);
  }

  private putInStorage(goods) {
    this.goodsService.putInStorage(this.goodsList.filter(
      item=> {
        return item.moved;
      }
    ));
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
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return (<string>current.goods.name).toLowerCase().localeCompare((<string>next.goods.name).toLowerCase());
          });
        else
          this.goodsList.sort((current, next)=> {
            return (<string>next.goods.name).toLowerCase().localeCompare((<string>current.goods.name).toLowerCase());
          });
        break;

      case "storageType":
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return (<string>current.goods.storageType.name).toLowerCase().localeCompare((<string>next.goods.storageType.name).toLowerCase());
          });
        else
          this.goodsList.sort((current, next)=> {
            return (<string>next.goods.storageType.name).toLowerCase().localeCompare((<string>current.goods.storageType.name).toLowerCase());
          });
        break;

      case "quantity":
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return current.goods.quantity - next.goods.quantity;
          });
        else
          this.goodsList.sort((current, next)=> {
            return next.goods.quantity - current.goods.quantity;
          });
        break;

      case "quantityUnit":
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return (<string>current.goods.quantityUnit.name).toLowerCase().localeCompare((<string>next.goods.quantityUnit.name).toLowerCase());
          });
        else
          this.goodsList.sort((current, next)=> {
            return (<string>next.goods.quantityUnit.name).toLowerCase().localeCompare((<string>current.goods.quantityUnit.name).toLowerCase());
          });
        break;

      case "price":
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return current.goods.price - next.goods.price;
          });
        else
          this.goodsList.sort((current, next)=> {
            return next.goods.price - current.goods.price;
          });
        break;

      case "priceUnit":
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return (<string>current.goods.priceUnit.name).toLowerCase().localeCompare((<string>next.goods.priceUnit.name).toLowerCase());
          });
        else
          this.goodsList.sort((current, next)=> {
            return (<string>next.goods.priceUnit.name).toLowerCase().localeCompare((<string>current.goods.priceUnit.name).toLowerCase());
          });
        break;

      case "weight":
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return current.goods.weight - next.goods.weight;
          });
        else
          this.goodsList.sort((current, next)=> {
            return next.goods.weight - current.goods.weight;
          });
        break;

      case "weightUnit":
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return (<string>current.goods.weightUnit.name).toLowerCase().localeCompare((<string>next.goods.weightUnit.name).toLowerCase());
          });
        else
          this.goodsList.sort((current, next)=> {
            return (<string>next.goods.weightUnit.name).toLowerCase().localeCompare((<string>current.goods.weightUnit.name).toLowerCase());
          });
        break;

      case "status":
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return (current.goods.status ? statusMessages.get(current.goods.status.name) : '').toLowerCase().localeCompare((next.goods.status ? statusMessages.get(next.goods.status.name) : '').toLowerCase());
          });
        else
          this.goodsList.sort((current, next)=> {
            return (next.goods.status ? statusMessages.get(next.goods.status.name) : '').toLowerCase().localeCompare((current.goods.status ? statusMessages.get(current.goods.status.name) : '').toLowerCase());
          });
        break;

      case "storageCell":
        if (this.sortingDirection == "UP")
          this.goodsList.sort((current, next)=> {
            return (current.goods.cells[0] ? current.goods.cells[0].number : '').toLowerCase().localeCompare((next.goods.cells[0] ? next.goods.cells[0].number : '').toLowerCase());
          });
        else
          this.goodsList.sort((current, next)=> {
            return (next.goods.cells[0] ? next.goods.cells[0].number : '').toLowerCase().localeCompare((current.goods.cells[0] ? current.goods.cells[0].number : '').toLowerCase());
          });
        break;

      default:
        break;
    }

    if (this.sortingDirection == "UP")
      this.sortingDirection = "DOWN"
    else this.sortingDirection = "UP"
  }


}
