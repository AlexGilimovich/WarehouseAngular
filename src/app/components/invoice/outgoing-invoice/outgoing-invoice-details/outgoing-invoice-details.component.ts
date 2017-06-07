import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompany} from "../../../customer/customer";
import {TransportCompany} from "../../../tr-company/tr-company";
import {FormBuilder, FormGroup} from "@angular/forms";
import {InvoiceService} from "../../invoice.service";
import {TransportCompanyService} from "../../../tr-company/tr-company.service";
import {WarehouseCustomerCompanyService} from "../../../customer/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OutgoingInvoice} from "../outgoing-invoice";
import {InvoiceStatus} from "../../invoice-status";
import {Goods} from "../../../goods/goods";
import {Location} from "@angular/common";

@Component({
  selector: 'app-outgoing-invoice-details',
  templateUrl: './outgoing-invoice-details.component.html',
  styleUrls: ['./outgoing-invoice-details.component.scss'],
  providers: [InvoiceService, WarehouseCustomerCompanyService, TransportCompanyService]
})
export class OutgoingInvoiceDetailsComponent implements OnInit {
  id: number;
  invoiceForm: FormGroup;
  goodsList: Goods[];
  status: InvoiceStatus;
  invoiceStatus = InvoiceStatus;

  constructor(private invoiceService: InvoiceService,
              private transportService: TransportCompanyService,
              private customerService: WarehouseCustomerCompanyService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
    this.invoiceForm = this.formBuilder.group({
      'number': [''],
      'issueDate': [''],
      'transportCompany': [''],
      'currentTransportCompany': [''],
      'receiverCompany': [''],
      'currentReceiverCompany': [''],
      'transportNumber': [''],
      'transportName': [''],
      // todo invisible driver if not auto
      'driver': [],
      'description': [''],
      'goodsEntryCount': ['']
    });
  }

  ngOnInit() {
    this.id = this.invoiceService.parseIdParam(this.route);
    this.invoiceService.getOutgoingInvoiceById(this.id).subscribe(data => {
      const invoice = data;
      this.mapFormFromInvoice(invoice);
      this.goodsList = invoice.goods;
      this.status = InvoiceStatus[invoice.status];
      console.log(invoice);
    });
  }

  onSubmit(form: FormGroup) {
    const invoice = this.invoiceService.mapOutgoingInvoiceFromForm(form, this.id);
    console.log(invoice);
    this.invoiceService.updateOutgoingInvoice(invoice).subscribe(data => {
      this.location.back();
    });
  }

  private mapFormFromInvoice(invoice: OutgoingInvoice) {
    this.invoiceForm.controls['number'].setValue(invoice.number);
    this.invoiceForm.controls['issueDate'].setValue(invoice.issueDate);
    this.invoiceForm.controls['transportCompany'].setValue(invoice.transportCompany);
    this.invoiceForm.controls['receiverCompany'].setValue(invoice.receiverCompany);
    this.invoiceForm.controls['transportNumber'].setValue(invoice.transportNumber);
    this.invoiceForm.controls['transportName'].setValue(invoice.transportName);
    if (invoice.driver != null) {
      this.invoiceForm.controls['driver'].setValue(invoice.driver);
    }
    this.invoiceForm.controls['description'].setValue(invoice.description);
    this.invoiceForm.controls['goodsEntryCount'].setValue(invoice.goodsEntryCount);
  }

}
