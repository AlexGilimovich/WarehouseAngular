import {User} from "../user/user";
import {Goods} from "./goods";
export class GoodsStatus {
  constructor(public id?:string,
              public date?:string,
              public name?:string,
              public note?:string,
              public user?:User,
              public goods?:Goods[]) {
  }
}
