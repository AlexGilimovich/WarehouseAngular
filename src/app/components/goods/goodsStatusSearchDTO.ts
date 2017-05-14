import {Unit} from "./unit";
import {StorageType} from "./storageType";
import {GoodsStatusName} from "./goodsStatusName";
export class GoodsStatusSearchDTO {
  constructor(public status?:GoodsStatusName,
              public date?:string,
              public userLastName?:string,
              public userFirstName?:string,
              public userPatronymic?:string) {

  }

}
