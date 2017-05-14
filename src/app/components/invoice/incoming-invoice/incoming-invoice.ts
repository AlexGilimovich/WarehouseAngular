export class IncomingInvoice {
  id?: number;
  number: string;
  // todo issueDate
  issueDate: string;
  supplierCompany: string;
  transportCompany: string;
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
