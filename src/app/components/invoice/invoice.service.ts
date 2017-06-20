import { Injectable } from '@angular/core';
import {HttpAuthService} from '../login/httpAuth.service';
import {IncomingInvoice} from './incoming-invoice/incoming-invoice';
import {RequestOptions, Response, Headers} from '@angular/http';
import {LoginService} from '../login/login.service';
import {User} from '../user/user';
import {Host} from '../../util/host';
import {FormGroup} from '@angular/forms';
import {Goods} from '../goods/goods';
import {ActivatedRoute} from '@angular/router';
import {OutgoingInvoice} from './outgoing-invoice/outgoing-invoice';
import {Observable} from 'rxjs/Observable';
import {InvoiceStatus} from './invoice-status';

const path = Host.getURL() + 'invoice';

@Injectable()
export class InvoiceService {

  constructor(private httpAuthService: HttpAuthService,
              private loginService: LoginService) { }

  getAllIncoming(page?: number, count?: number) {
    const url = path + '/incoming';
    const headers = new Headers();
    const params = new URLSearchParams();
    if (page != null) {
      params.set('page', page.toString());
    }
    if (count != null) {
      params.set('count', count.toString());
    }
    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return (response.json()).map(item => {
        return this.mapIncomingInvoiceFromItem(item);
      });
    });
  }

  getAllOutgoing(page?: number, count?: number) {
    const url = path + '/outgoing';
    const headers = new Headers();
    const params = new URLSearchParams();
    if (page != null) {
      params.set('page', page.toString());
    }
    if (count != null) {
      params.set('count', count.toString());
    }
    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return (response.json()).map(item => {
        return this.mapOutgoingInvoiceFromItem(item);
      });
    });
  }

  getInvoicesCount() {
    const url = path + '/count';
    const headers = new Headers();
    const params = new URLSearchParams();
    const options = new RequestOptions({
      headers: headers,
      params: params
    });

    return this.httpAuthService.get(url, options).map((response: Response) => {
      return response.json().count;
    });
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

  getOutgoingInvoiceById(id: number) {
    if (id != null) {
      const url = path + '/outgoing/' + id;
      const headers = new Headers();
      const options = new RequestOptions({
        headers: headers,
      });

      return this.httpAuthService.get(url, options).map((response: Response) => {
        const item = response.json();
        return this.mapOutgoingInvoiceFromItem(item);
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

  updateIncomingInvoice(invoice: IncomingInvoice) {
    const url = path + '/incoming/' + invoice.id;
    const body = JSON.stringify(invoice);
    return this.updateInvoice(url, body);
  }

  updateOutgoingInvoice(invoice: OutgoingInvoice) {
    const url = path + '/outgoing/' + invoice.id;
    const body = JSON.stringify(invoice);
    return this.updateInvoice(url, body);
  }

  updateInvoiceStatus(id: number, status: InvoiceStatus) {
    const url = path + '/' + id + '?status=' + InvoiceStatus[status];
    const headers = new Headers();
    const options = new RequestOptions({
      headers: headers
    });

    // todo remove cause is not used
    const body = '';

    return this.httpAuthService.put(url, body, options).map((response: Response) => {
      if (response.text()) {
        return (response.json());
      }
    });
  }

  delete(id: number) {
    if (id != null) {
      const url = path + '/' + id.toString();
      const headers = new Headers();
      headers.set('Content-Type', 'application/json;charset=utf-8');
      const options = new RequestOptions({
        headers: headers
      });

      return this.httpAuthService.delete(url, options).map((response: Response) => {
        if (response.text()) {
          return (response.json());
        }
      });
    }
  }

  parseIdParam(route: ActivatedRoute) {
    let id;
    route.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  private saveInvoice(url: string, body: string) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });

    return this.httpAuthService.post(url, body, options).map((response: Response) => {
      if (response.text()) {
        return (response.json());
      }
    });
  }

  private updateInvoice(url: string, body: string) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=utf-8');
    const options = new RequestOptions({
      headers: headers
    });

    return this.httpAuthService.put(url, body, options).map((response: Response) => {
      if (response.text()) {
        return (response.json());
      }
    });
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
    return invoice;
  }

  private mapIncomingInvoiceFromItem(item: any): IncomingInvoice{
    const invoice = new IncomingInvoice();
    invoice.id = item.id;
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
    invoice.goodsEntryCount = item.goodsEntryCount;
    invoice.status = item.status;
    invoice.goods = item.goods;
    return invoice;
  }

  private mapOutgoingInvoiceFromItem(item: any): OutgoingInvoice{
    const invoice = new OutgoingInvoice();
    invoice.id = item.id;
    invoice.number = item.number;
    invoice.issueDate = item.issueDate;
    invoice.transportCompany = item.transportCompany;
    invoice.receiverCompany = item.receiverCompany;
    invoice.transportName = item.transportName;
    invoice.transportNumber = item.transportNumber;
    if (item.driver != null) {
      invoice.driver = item.driver;
    }
    invoice.description = item.description;
    invoice.goodsEntryCount = item.goodsEntryCount;
    invoice.status = item.status;
    invoice.goods = item.goods;
    return invoice;
  }

  removeIncomingInvoiceFromArray(invoices: IncomingInvoice[], invoice: IncomingInvoice) {
    const index = invoices.indexOf(invoice, 0);
    if (index > -1) {
      invoices.splice(index, 1);
    }
    return invoices;
  }

  deleteGoodsFromArray(goodsList: Goods[], goods: Goods) {
    const index = goodsList.indexOf(goods, 0);
    if (index > -1) {
      goodsList.splice(index, 1);
    }
    return goodsList;
  }

  removeOutgoingInvoiceFromArray(invoices: OutgoingInvoice[], invoice: OutgoingInvoice) {
    const index = invoices.indexOf(invoice, 0);
    if (index > -1) {
      invoices.splice(index, 1);
    }
    return invoices;
  }
}
