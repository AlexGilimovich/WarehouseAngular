import {User} from "../user/user";
import {Act} from "./act";
import {ActTypeName} from "./actTypeName";
import {Goods} from "../goods/goods";
export class ActType {
  constructor(public id?:string,
              public name?:ActTypeName) {
  }
}
