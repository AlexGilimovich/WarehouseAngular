import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TransportCompany} from "../../../tr-company/tr-company";
import {WarehouseCustomerCompany} from "../../../customer/customer";
import {InvoiceService} from "../../invoice.service";
import {TransportCompanyService} from "../../../tr-company/tr-company.service";
import {WarehouseCustomerCompanyService} from "../../../customer/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-outgoing-invoice-create',
  templateUrl: './outgoing-invoice-create.component.html',
  styleUrls: ['./outgoing-invoice-create.component.scss'],
  providers: [InvoiceService, TransportCompanyService, WarehouseCustomerCompanyService]
})
export class OutgoingInvoiceCreateComponent implements OnInit {
  invoiceForm: FormGroup;
  transportCompanies: TransportCompany[];
  receiverCompanies: WarehouseCustomerCompany[];
  // @ViewChild('transportModal') transportModal: ElementRef;

  constructor(private invoiceService: InvoiceService,
              private transportService: TransportCompanyService,
              private customerService: WarehouseCustomerCompanyService,
              private formBuilder: FormBuilder,
              private router: Router) {
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
  }

  ngOnInit() {
    // todo add search by elastic in modal
    this.transportService.getAll().subscribe(data => {
      this.transportCompanies = data;
    });
    this.customerService.getAll().subscribe(data => {
      this.receiverCompanies = data;
    });
  }

  onSubmit(form: FormGroup) {
    const invoice = this.invoiceService.mapOutgoingInvoiceFromForm(form);
    console.log(invoice);
    this.invoiceService.saveOutgoingInvoice(invoice).subscribe(data => {
      console.log(data);
    });
  }

  onTransportChange() {
    this.invoiceForm.controls['currentTransportCompany'].setValue(this.invoiceForm.controls['transportCompany'].value.name);
  }

  onReceiverChange() {
    this.invoiceForm.controls['currentReceiverCompany'].setValue(this.invoiceForm.controls['receiverCompany'].value.name);
  }

}
