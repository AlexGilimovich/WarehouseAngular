import {StorageSpaceType} from "../warehouse-scheme/storage-space-type";
import {WarehouseCompany} from "../warehouse-company/warehouse-company";

export class Price {

  public idPriceList:number;
  public startTime:string;
  public endTime:string;
  public dailyPrice:string;
  public storageSpaceType:StorageSpaceType;
  public warehouseCompany:WarehouseCompany;
  public comment:string;

  constructor() {
  }


}
