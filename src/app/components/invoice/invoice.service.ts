import { Injectable } from '@angular/core';
import {HttpAuthService} from "../login/httpAuth.service";
import {IncomingInvoice} from "./incoming-invoice/incoming-invoice";
import {RequestOptions, Response, Headers} from "@angular/http";
import {LoginService} from "../login/login.service";
import {User} from "../user/user";
import {Host} from "../../util/host";
import {FormGroup} from "@angular/forms";
import {Goods} from "../goods/goods";

const path = Host.getURL() + 'invoice';

@Injectable()
export class InvoiceService {

  constructor(private httpAuthService: HttpAuthService,
              private loginService: LoginService) { }

  getLoggedUser(){
    const dispatcher = this.loginService.getLoggedUser();
    return this.buildFullName(dispatcher);
  }

  saveIncomingInvoice(invoice: IncomingInvoice) {
    const url = path + '/incoming/';
    const body = JSON.stringify(invoice);
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

  mapIncomingInvoiceFromForm(form: FormGroup) {
    const invoice = new IncomingInvoice();
    invoice.number = form.controls['number'].value;
    invoice.issueDate = form.controls['issueDate'].value;
    invoice.transportCompany = form.controls['transportCompany'].value.id;
    invoice.supplierCompany = form.controls['supplierCompany'].value.id;
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
}
