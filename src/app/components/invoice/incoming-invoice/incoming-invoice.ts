import {TransportCompany} from "../../tr-company/tr-company";
import {WarehouseCustomerCompany} from "../../customer/customer";
import {Goods} from "../../goods/goods";
import {Driver} from "../../driver/driver";
import {Timestamp} from "rxjs/Rx";
import {User} from "../../user/user";
import {Unit} from "../../goods/unit";
export class IncomingInvoice {
  id?: number;
  number: string;
  issueDate: Date;
  supplierCompany: WarehouseCustomerCompany;
  transportCompany: TransportCompany;
  transportNumber: string;
  transportName: string;
  driver?: Driver;
  description: string;
  goodsQuantity: number;
  goodsEntryCount: number;
  goodsQuantityUnit: Unit;
  goodsEntryCountUnit: Unit;
  dispatcher?: string;
  goods: Goods[];
  status?: string;
  registrationDate?: Date;
}
