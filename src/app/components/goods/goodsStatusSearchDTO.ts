import {GoodsStatusName} from "./goodsStatusName";
export class GoodsStatusSearchDTO {
  constructor(public status?:GoodsStatusName,
              public fromDate?:string,
              public toDate?:string,
              public userLastName?:string,
              public userFirstName?:string,
              public userPatronymic?:string) {

  }

}
