import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IncomingInvoice} from "../incoming-invoice";
import {InvoiceService} from "../../invoice.service";
import {TransportCompanyService} from "../../../tr-company/tr-company.service";
import {WarehouseCustomerCompanyService} from "../../../customer/customer.service";
import {TransportCompany} from "../../../tr-company/tr-company";
import {WarehouseCustomerCompany} from "../../../customer/customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Goods} from "../../../goods/goods";
import {GoodsService} from "../../../goods/goods.service";
import {GoodsCreateComponent} from "../../../goods/goods-create/goods-create.component";

@Component({
  selector: 'app-incoming-invoice-create',
  templateUrl: './incoming-invoice-create.component.html',
  styleUrls: ['./incoming-invoice-create.component.scss'],
  providers: [InvoiceService, TransportCompanyService,
    WarehouseCustomerCompanyService, GoodsService]
})
export class IncomingInvoiceCreateComponent implements OnInit {
  invoiceForm: FormGroup;
  transportCompanies: TransportCompany[];
  supplierCompanies: WarehouseCustomerCompany[];
  goodsList: Goods[] = [];
  // @ViewChild('transportModal') transportModal: ElementRef;

  constructor(private invoiceService: InvoiceService,
              private transportService: TransportCompanyService,
              private customerService: WarehouseCustomerCompanyService,
              private goodsService: GoodsService,
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
    invoice.goods = this.goodsList;
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

  createGoods() {
    let goods: Goods;
    this.goodsService.goodsCreated$.subscribe(res => {
      goods = res;
      this.goodsList.push(goods);
      console.log(this.goodsList);
    });
  }

  // openTransportModal() {
  //   this.transportModal.nativeElement.click();
  // }

}
