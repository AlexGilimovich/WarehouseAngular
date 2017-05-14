import {User} from "../user/user";
import {Goods} from "../goods/goods";
import {ActType} from "./actType";
export class Act {
  constructor(public id?:string,
              public date?:string,
              public user?:User,
              public goods?:Goods[],
              public actType?:ActType) {

  }

}

