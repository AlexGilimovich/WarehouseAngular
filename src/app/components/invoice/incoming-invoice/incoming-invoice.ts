import {TransportCompany} from "../../tr-company/tr-company";
import {WarehouseCustomerCompany} from "../../customer/customer";
import {Goods} from "../../goods/goods";
export class IncomingInvoice {
  id?: number;
  number: string;
  issueDate: Date;
  supplierCompany: number;
  transportCompany: number;
  transportNumber: string;
  transportName: string;
  driver?: string;
  description: string;
  goodsQuantity: number;
  goodsEntryCount: number;
  goodsQuantityUnit: string;
  goodsEntryCountUnit: string;
  dispatcher?: string;
  goods: Goods[];
}
