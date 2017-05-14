import {TransportCompany} from "../../tr-company/tr-company";
import {WarehouseCustomerCompany} from "../../customer/customer";
export class IncomingInvoice {
  id?: number;
  number: string;
  // todo issueDate
  issueDate: string;
  supplierCompany: WarehouseCustomerCompany;
  transportCompany: TransportCompany;
  transportNumber: string;
  transportName: string;
  driver: string;
  description: string;
  goodsQuantity: number;
  goodsEntryCount: number;
  goodsQuantityUnit: string;
  goodsEntryCountUnit: string;
  dispatcher: string;
  // todo goods: [];
}
