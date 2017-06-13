import { Unit } from "./unit";
import { StorageType } from "./storageType";
import { StorageCell } from "../warehouse-scheme/storage-cell";
import { StorageSpace } from "../warehouse-scheme/storage-space";
import { GoodsStatus } from "./goodsStatus";
export class Goods {
  public id: string;
  public name: string;
  public quantity: string;
  public weight: string;
  public price: string;
  public storageType: StorageType;
  public quantityUnit: Unit;
  public weightUnit: Unit;
  public priceUnit: Unit;
  public cells: StorageCell[];
  public storageSpace: StorageSpace[];
  public currentStatus: GoodsStatus;
  public registeredStatus: GoodsStatus;
  public movedOutStatus: GoodsStatus;
  public warehouseId: number;

  constructor() {
  }

}
