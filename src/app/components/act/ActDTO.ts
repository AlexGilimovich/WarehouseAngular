import {Goods} from "../goods/goods";
export class ActDTO {
  constructor(public type?:string,
              public goodsList?:Goods[]) {

  }

}


