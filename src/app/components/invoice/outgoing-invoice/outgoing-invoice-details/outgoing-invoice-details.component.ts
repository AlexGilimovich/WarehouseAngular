import { Component, OnInit } from '@angular/core';
import {WarehouseCustomerCompany} from "../../../customer/customer";
import {TransportCompany} from "../../../tr-company/tr-company";
import {FormBuilder, FormGroup} from "@angular/forms";
import {InvoiceService} from "../../invoice.service";
import {TransportCompanyService} from "../../../tr-company/tr-company.service";
import {WarehouseCustomerCompanyService} from "../../../customer/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OutgoingInvoice} from "../outgoing-invoice";

@Component({
  selector: 'app-outgoing-invoice-details',
  templateUrl: './outgoing-invoice-details.component.html',
  styleUrls: ['./outgoing-invoice-details.component.scss'],
  providers: [InvoiceService, WarehouseCustomerCompanyService, TransportCompanyService]
})
export class OutgoingInvoiceDetailsComponent implements OnInit {
  id: number;
  invoiceForm: FormGroup;
  transportCompanies: TransportCompany[];
  receiverCompanies: WarehouseCustomerCompany[];
  defaultTransport: TransportCompany;
  defaultReceiver: WarehouseCustomerCompany;
  // @ViewChild('transportModal') transportModal: ElementRef;

  constructor(private invoiceService: InvoiceService,
              private transportService: TransportCompanyService,
              private customerService: WarehouseCustomerCompanyService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
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
      'goodsEntryCount': [0],
      'goodsEntryCountUnit': [''],
      'goodsQuantity': [0],
      'goodsQuantityUnit': ['']
      // todo goods
    });
    this.defaultTransport = new TransportCompany;
    this.defaultReceiver = new WarehouseCustomerCompany;
  }

  ngOnInit() {
    this.id = this.invoiceService.parseIdParam(this.route);
    this.invoiceService.getOutgoingInvoiceById(this.id).subscribe(data => {
      const invoice = data;
      console.log(invoice);
      this.mapFormFromInvoice(invoice);
    });
    // todo add search by elastic in modal
    this.transportService.getAll().subscribe(data => {
      this.transportCompanies = data;
    });
    this.customerService.getAll().subscribe(data => {
      this.receiverCompanies = data;
    });
  }

  onSubmit(form: FormGroup) {
    const invoice = this.invoiceService.mapOutgoingInvoiceFromForm(form, this.id);
    console.log(invoice);
    this.invoiceService.updateOutgoingInvoice(invoice).subscribe(data => {
      this.router.navigateByUrl('invoice/outgoing');
    });
  }

  onTransportChange() {
    this.invoiceForm.controls['currentTransportCompany'].setValue(this.invoiceForm.controls['transportCompany'].value.name);
  }

  onReceiverChange() {
    this.invoiceForm.controls['currentReceiverCompany'].setValue(this.invoiceForm.controls['receiverCompany'].value.name);
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
    this.invoiceForm.controls['goodsEntryCountUnit'].setValue(invoice.goodsEntryCountUnit);
    this.invoiceForm.controls['goodsQuantity'].setValue(invoice.goodsQuantity);
    this.invoiceForm.controls['goodsQuantityUnit'].setValue(invoice.goodsQuantityUnit);
    // todo goods

    this.defaultTransport = invoice.transportCompany;
    this.defaultReceiver = invoice.receiverCompany;
  }

}
