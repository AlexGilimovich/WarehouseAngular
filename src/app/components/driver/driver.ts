import {TransportCompany} from "../tr-company/tr-company";

export class Driver {
  id: number;
  fullName: string;
  passportNumber: string;
  countryCode: string;
  issuedBy: string;
  issueDate: Date;
  transportCompany: TransportCompany;
}
