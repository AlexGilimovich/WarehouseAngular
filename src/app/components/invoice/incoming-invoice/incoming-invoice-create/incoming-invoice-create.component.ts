import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IncomingInvoice} from "../incoming-invoice";
import {InvoiceService} from "../../invoice.service";
import {TransportCompanyService} from "../../../tr-company/tr-company.service";
import {WarehouseCustomerCompanyService} from "../../../customer/customer.service";
import {TransportCompany} from "../../../tr-company/tr-company";
import {WarehouseCustomerCompany} from "../../../customer/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-incoming-invoice-create',
  templateUrl: './incoming-invoice-create.component.html',
  styleUrls: ['./incoming-invoice-create.component.scss'],
  providers: [InvoiceService, TransportCompanyService, WarehouseCustomerCompanyService]
})
export class IncomingInvoiceCreateComponent implements OnInit {
  invoiceForm: FormGroup;
  transportCompanies: TransportCompany[];
  supplierCompanies: WarehouseCustomerCompany[];
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
  }

  ngOnInit() {
    // todo add search by elastic in modal
    this.transportService.getAll().subscribe(data => {
      this.transportCompanies = data;
    });
    this.customerService.getAll().subscribe(data => {
      this.supplierCompanies = data;
    });
  }

  onSubmit(form: FormGroup) {
    const invoice = this.invoiceService.mapIncomingInvoiceFromForm(form);
    console.log(invoice);
    this.invoiceService.saveIncomingInvoice(invoice).subscribe(data => {
      this.router.navigateByUrl('invoice/incoming');
    });
  }

  onTransportChange() {
    this.invoiceForm.controls['currentTransportCompany'].setValue(this.invoiceForm.controls['transportCompany'].value.name);
  }

  onSupplierChange() {
    this.invoiceForm.controls['currentSupplierCompany'].setValue(this.invoiceForm.controls['supplierCompany'].value.name);
  }

  // openTransportModal() {
  //   this.transportModal.nativeElement.click();
  // }

}
