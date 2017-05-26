import { Injectable } from '@angular/core';
import {HttpAuthService} from "../login/httpAuth.service";
import {IncomingInvoice} from "./incoming-invoice/incoming-invoice";
import {RequestOptions, Response, Headers} from "@angular/http";
import {LoginService} from "../login/login.service";
import {User} from "../user/user";
import {Host} from "../../util/host";
import {FormGroup} from "@angular/forms";
import {Goods} from "../goods/goods";
import {ActivatedRoute} from "@angular/router";
import {OutgoingInvoice} from "./outgoing-invoice/outgoing-invoice";
import {Observable} from "rxjs/Observable";

const path = Host.getURL() + 'invoice';

@Injectable()
export class InvoiceService {

  constructor(private httpAuthService: HttpAuthService,
              private loginService: LoginService) { }

  getLoggedUser(){
    const dispatcher = this.loginService.getLoggedUser();
    return this.buildFullName(dispatcher);
  }

  getIncomingInvoiceById(id: number) {
    if (id != null) {
      const url = path + '/incoming/' + id;
      const headers = new Headers();
      const options = new RequestOptions({
        headers: headers,
      });

      return this.httpAuthService.get(url, options).map((response: Response) => {
        const item = response.json();
        return this.mapIncomingInvoiceFromItem(item);
      });
    }
  }

  saveIncomingInvoice(invoice: IncomingInvoice) {
    const url = path + '/incoming/';
    const body = JSON.stringify(invoice);
    return this.saveInvoice(url, body);
  }

  saveOutgoingInvoice(invoice: OutgoingInvoice) {
    const url = path + '/outgoing/';
    const body = JSON.stringify(invoice);
    return this.saveInvoice(url, body);
  }

  saveInvoice(url: string, body: string){
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    return this.httpAuthService.post(url, body, options).map((response: Response) => {
      if (response.text()) {
        return (response.json());
      }
    });
  }

  updateIncomingInvoice(invoice: IncomingInvoice) {
    const url = path + '/incoming/' + invoice.id;
    const body = JSON.stringify(invoice);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });
    console.log(body);

    return this.httpAuthService.put(url, body, options).map((response: Response) => {
      if (response.text()) {
        return (response.json());
      }
    });
  }

  mapIncomingInvoiceFromForm(form: FormGroup, id?: number) {
    const invoice = new IncomingInvoice();
    if (id != null) {
      invoice.id = id;
    }
    invoice.number = form.controls['number'].value;
    invoice.issueDate = form.controls['issueDate'].value;
    invoice.transportCompany = form.controls['transportCompany'].value;
    invoice.supplierCompany = form.controls['supplierCompany'].value;
    invoice.transportNumber = form.controls['transportNumber'].value;
    invoice.transportName = form.controls['transportName'].value;
    if (form.controls['driver'].value != null) {
      invoice.driver = form.controls['driver'].value;
    }
    invoice.description = form.controls['description'].value;
    invoice.goodsEntryCount = form.controls['goodsEntryCount'].value;
    invoice.goodsEntryCountUnit = form.controls['goodsEntryCountUnit'].value;
    invoice.goodsQuantity = form.controls['goodsQuantity'].value;
    invoice.goodsQuantityUnit = form.controls['goodsQuantityUnit'].value;

    // todo remove mock goods
    invoice.goods = [];
    return invoice;
  }

  mapOutgoingInvoiceFromForm(form: FormGroup, id?: number) {
    const invoice = new OutgoingInvoice();
    if (id != null) {
      invoice.id = id;
    }
    invoice.number = form.controls['number'].value;
    invoice.issueDate = form.controls['issueDate'].value;
    invoice.transportCompany = form.controls['transportCompany'].value;
    invoice.receiverCompany = form.controls['receiverCompany'].value;
    invoice.transportNumber = form.controls['transportNumber'].value;
    invoice.transportName = form.controls['transportName'].value;
    if (form.controls['driver'].value != null) {
      invoice.driver = form.controls['driver'].value;
    }
    invoice.description = form.controls['description'].value;
    invoice.goodsEntryCount = form.controls['goodsEntryCount'].value;
    invoice.goodsEntryCountUnit = form.controls['goodsEntryCountUnit'].value;
    invoice.goodsQuantity = form.controls['goodsQuantity'].value;
    invoice.goodsQuantityUnit = form.controls['goodsQuantityUnit'].value;

    // todo remove mock goods
    invoice.goods = [];
    return invoice;
  }

  parseIdParam(route: ActivatedRoute) {
    let id;
    route.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  private buildFullName(user: User) {
    let name = '';
    if (user.lastName != null) {
      name += user.lastName;
      name += ' ';
    }
    if (user.firstName != null) {
      name += user.firstName;
    }
    return name;
  }

  private mapIncomingInvoiceFromItem(item: any): IncomingInvoice{
    const invoice = new IncomingInvoice();
    invoice.number = item.number;
    invoice.issueDate = item.issueDate;
    invoice.transportCompany = item.transportCompany;
    invoice.supplierCompany = item.supplierCompany;
    invoice.transportName = item.transportName;
    invoice.transportNumber = item.transportNumber;
    if (item.driver != null) {
      invoice.driver = item.driver;
    }
    invoice.description = item.description;
    invoice.goodsQuantity = item.goodsQuantity;
    invoice.goodsQuantityUnit = item.goodsQuantityUnit;
    invoice.goodsEntryCount = item.goodsEntryCount;
    invoice.goodsEntryCountUnit = item.goodsEntryCountUnit;
    return invoice;
  }

  private mapOutgoingInvoiceFromItem(item: any) {

  }
}
