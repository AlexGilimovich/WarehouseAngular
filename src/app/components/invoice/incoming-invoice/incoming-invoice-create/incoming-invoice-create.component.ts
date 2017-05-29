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
import {Unit} from "../../../goods/unit";
declare const $: any;

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
  chosenTransport: TransportCompany;
  supplierCompanies: WarehouseCustomerCompany[];
  chosenSupplier: WarehouseCustomerCompany;
  goodsList: Goods[] = [];
  units: Unit[] = [];

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
      'supplierCompany': [''],
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
    $('body').foundation();
    this.transportService.getAll().subscribe(data => {
      this.transportCompanies = data;
    });
    this.customerService.getAll().subscribe(data => {
      this.supplierCompanies = data;
    });
    this.goodsService.getUnits().subscribe(data => {
      this.units = data;
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

  refreshTransportCompanies(searchParams: string) {
    this.transportService.search(searchParams).subscribe(data => {
      this.transportCompanies = data;
    });
  }

  onTransportChosen(company: TransportCompany) {
    this.chosenTransport = company;
  }

  saveTransport() {
    this.invoiceForm.controls['transportCompany'].setValue(this.chosenTransport);
    this.closeTransportModal();
  }

  refreshSupplierCompanies(searchParams: string) {
    this.customerService.search(searchParams).subscribe(data => {
      this.supplierCompanies = data;
    });
  }

  onSupplierChosen(supplier: WarehouseCustomerCompany) {
    this.chosenSupplier = supplier;
  }

  saveSupplier() {
    this.invoiceForm.controls['supplierCompany'].setValue(this.chosenSupplier);
    this.closeSupplierModal();
  }

  createGoods() {
    this.openGoodsModal();
    let goods: Goods;
    const subscription = this.goodsService.goodsCreated$.subscribe(res => {
      goods = res;
      this.goodsList.push(goods);
      this.closeGoodsModal();
      subscription.unsubscribe();
    });
  }

  deleteGoods(goods: Goods) {
    this.goodsList = this.invoiceService.deleteGoodsFromArray(this.goodsList, goods);
  }

  openTransportModal() {
    $('#transportModal').foundation('open');
  }

  closeTransportModal() {
    $('#transportModal').foundation('close');
  }

  openSupplierModal() {
    $('#supplierModal').foundation('open');
  }

  closeSupplierModal() {
    $('#supplierModal').foundation('close');
  }

  openGoodsModal() {
    $('#goodsModal').foundation('open');
  }

  closeGoodsModal() {
    $('#goodsModal').foundation('close');
  }
}
