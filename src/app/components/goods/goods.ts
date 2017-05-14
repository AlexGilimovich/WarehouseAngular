import {Unit} from "./unit";
import {StorageType} from "./storageType";
export class Goods {
  constructor(public id?:string,
              public name?:string,
              public quantity?:string,
              public weight?:string,
              public price?:string,
              public storageType?:StorageType,
              public quantityUnit?:Unit,
              public weightUnit?:Unit,
              public priceUnit?:Unit,
              //todo StorageSpace
              public storageSpace?:string[],
              public storageCell?:string[]) {
  }

}
