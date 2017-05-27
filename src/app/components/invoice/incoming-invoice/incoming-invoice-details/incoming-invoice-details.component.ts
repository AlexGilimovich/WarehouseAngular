import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TransportCompany} from "../../../tr-company/tr-company";
import {WarehouseCustomerCompany} from "../../../customer/customer";
import {InvoiceService} from "../../invoice.service";
import {TransportCompanyService} from "../../../tr-company/tr-company.service";
import {WarehouseCustomerCompanyService} from "../../../customer/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IncomingInvoice} from "../incoming-invoice";

@Component({
  selector: 'app-incoming-invoice-details',
  templateUrl: './incoming-invoice-details.component.html',
  styleUrls: ['./incoming-invoice-details.component.scss'],
  providers: [InvoiceService, WarehouseCustomerCompanyService, TransportCompanyService]
})
export class IncomingInvoiceDetailsComponent implements OnInit {
  id: number;
  invoiceForm: FormGroup;
  transportCompanies: TransportCompany[];
  supplierCompanies: WarehouseCustomerCompany[];
  defaultTransport: TransportCompany;
  defaultSupplier: WarehouseCustomerCompany;
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
      'supplierCompany': [''],
      'currentSupplierCompany': [''],
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
    this.defaultSupplier = new WarehouseCustomerCompany;
  }

  ngOnInit() {
    this.id = this.invoiceService.parseIdParam(this.route);
    this.invoiceService.getIncomingInvoiceById(this.id).subscribe(data => {
      const invoice = data;
      console.log(invoice);
      this.mapFormFromInvoice(invoice);
    });
    // todo add search by elastic in modal
    this.transportService.getAll().subscribe(data => {
      this.transportCompanies = data;
    });
    this.customerService.getAll().subscribe(data => {
      this.supplierCompanies = data;
    });
  }

  onSubmit(form: FormGroup) {
    const invoice = this.invoiceService.mapIncomingInvoiceFromForm(form, this.id);
    console.log(invoice);
    this.invoiceService.updateIncomingInvoice(invoice).subscribe(data => {
      this.router.navigateByUrl('invoice/incoming');
    });
  }

  onTransportChange() {
    this.invoiceForm.controls['currentTransportCompany'].setValue(this.invoiceForm.controls['transportCompany'].value.name);
  }

  onSupplierChange() {
    this.invoiceForm.controls['currentSupplierCompany'].setValue(this.invoiceForm.controls['supplierCompany'].value.name);
  }

  private mapFormFromInvoice(invoice: IncomingInvoice) {
    this.invoiceForm.controls['number'].setValue(invoice.number);
    this.invoiceForm.controls['issueDate'].setValue(invoice.issueDate);
    this.invoiceForm.controls['transportCompany'].setValue(invoice.transportCompany);
    this.invoiceForm.controls['supplierCompany'].setValue(invoice.supplierCompany);
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
    this.defaultSupplier = invoice.supplierCompany;
  }

}
