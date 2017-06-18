import {WarehouseCustomerCompany} from "../../customer/customer";
import {TransportCompany} from "../../tr-company/tr-company";
import {Goods} from "../../goods/goods";
import {Driver} from "../../driver/driver";
export class OutgoingInvoice {
  id?: number;
  number: string;
  issueDate: Date;
  receiverCompany: WarehouseCustomerCompany;
  transportCompany: TransportCompany;
  transportNumber: string;
  transportName: string;
  driver?: Driver;
  description: string;
  goodsEntryCount: string;
  manager?: string;
  goods: Goods[];
  status?: string;
  registrationDate?: Date;
}
