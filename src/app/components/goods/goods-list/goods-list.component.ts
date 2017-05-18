import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {GoodsService} from "../goods.service";
import {GoodsStatusName} from "../goodsStatusName";
import {WarehouseService} from "../../warehouse/warehouse.service";
import {StorageCell} from "../../warehouse-scheme/storage-cell";
import {Subscription} from "rxjs";
import {statusMessages} from "../goods.module";

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
  private statusMessages= statusMessages;
  private batchStatus = {name: '', note: ''};
  // private units:Unit[];
  // private storageTypes:StorageType[];
  // private unitTypeMessages= unitTypeMessages;
  // private storageTypeMessages=storageTypeMessages;

  private sortingDirection = "UP";

  //pagination
  private itemsOnPageArray = [10, 20];
  private currentPage:number = 1;
  private itemsOnPage:number = this.itemsOnPageArray[0];
  private totalItemsCount;
  private pageArray;
  private totalPageCount;
  private displayedPageCount = 7;//constant: number of pages in pagination

  constructor(private goodsService:GoodsService,
              private warehouseService: WarehouseService,
              private router:Router,
              private route:ActivatedRoute) {
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

  private getPage(page:number) {
    this.goodsList = [];
    this.currentPage = page;
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

  private goToDetails(id:string):void {
    this.router.navigate(['../details', id], {relativeTo: this.route});
  }


  private statusChangedEvent(e, goods) {
    if (!goods.goods.status && e.target.value) {
      goods.changed = true;
      goods.newStatus.name = e.target.value;
      goods.newStatus.note = '';
      this.onChanged.emit(true);
    }
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
        this.getPage(this.currentPage);
      }
    );
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
    $('#selectAll').prop('checked', false);
  }

  private putInStorage(goods) {
    // this.router.navigate(['../../warehouse'], {relativeTo: this.route, queryParams:{ storageTypeId: goods.goods.storageType.id, warehouseId: this.warehouseId }});
    // subscription: Subscription = this.warehouseService.selectedCells$.subscribe(
    //   cells => {
    //     cells.forEach(
    //       cell=>{
    //         let c = new StorageCell();
    //         c.idStorageCell = cell.idStorageCell;
    //         c.number = cell.number;
    //         goods.goods.StorageCell.push(c);
    //         goods.changed = true;
    //       }
    //     );
    //   });
    //todo
    // this.goodsService.putInStorage();
  }

  // private hasCell(goods, cell) {
  //   let hasCell:boolean = false;
  //   goods.goods.storageCell.forEach(
  //     item=> {
  //       if (item.idStorageCell == cell.idStorageCell)
  //         hasCell = true;
  //     }
  //   )
  //   return hasCell;
  // }

  public openStatusModal() {
    $('#statusModal').foundation('open');
  }

  public closeStatusModal() {
    $('#statusModal').foundation('close');
  }
}
