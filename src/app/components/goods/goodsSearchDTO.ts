import {Unit} from "./unit";
import {StorageType} from "./storageType";
import {GoodsStatusName} from "./goodsStatusName";
import {GoodsStatusSearchDTO} from "./goodsStatusSearchDTO";
export class GoodsSearchDTO {
  constructor(public name?:string,
              public minQuantity?:string,
              public maxQuantity?:string,
              public minWeight?:string,
              public maxWeight?:string,
              public minPrice?:string,
              public maxPrice?:string,
              public storageType?:StorageType,
              public quantityUnit?:Unit,
              public weightUnit?:Unit,
              public priceUnit?:Unit,
              public currentStatus?:GoodsStatusName,
              public statuses?:GoodsStatusSearchDTO[]) {

  }
}

