import {WarehouseCompany} from "../warehouse-company/warehouse-company";
/**
 * Created by Lenovo on 09.05.2017.
 */

export class Warehouse {

  constructor(public idWarehouse?:number,
              public name?:string,
              public status?: boolean,
              public x?: number,
              public y?: number,
              public warehouseCompany?:WarehouseCompany) {

  }

}
