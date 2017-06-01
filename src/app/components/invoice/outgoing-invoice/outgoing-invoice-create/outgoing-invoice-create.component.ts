import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TransportCompany} from "../../../tr-company/tr-company";
import {WarehouseCustomerCompany} from "../../../customer/customer";
import {InvoiceService} from "../../invoice.service";
import {TransportCompanyService} from "../../../tr-company/tr-company.service";
import {WarehouseCustomerCompanyService} from "../../../customer/customer.service";
import {Router} from "@angular/router";
import {GoodsService} from "../../../goods/goods.service";
import {Goods} from "../../../goods/goods";
import {Unit} from "../../../goods/unit";
declare const $: any;

@Component({
  selector: 'app-outgoing-invoice-create',
  templateUrl: './outgoing-invoice-create.component.html',
  styleUrls: ['./outgoing-invoice-create.component.scss'],
  providers: [InvoiceService, TransportCompanyService,
    WarehouseCustomerCompanyService, GoodsService]
})
export class OutgoingInvoiceCreateComponent implements OnInit {
  invoiceForm: FormGroup;
  transportCompanies: TransportCompany[];
  chosenTransport: TransportCompany;
  receiverCompanies: WarehouseCustomerCompany[];
  chosenReceiver: WarehouseCustomerCompany;
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
      'receiverCompany': [''],
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
      this.receiverCompanies = data;
    });
    this.goodsService.getUnits().subscribe(data => {
      this.units = data;
    });
  }

  onSubmit(form: FormGroup) {
    const invoice = this.invoiceService.mapOutgoingInvoiceFromForm(form);
    invoice.goods = this.goodsList;
    console.log(invoice);
    this.invoiceService.saveOutgoingInvoice(invoice).subscribe(data => {
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

  refreshReceiverCompanies(searchParams: string) {
    this.customerService.search(searchParams).subscribe(data => {
      this.receiverCompanies = data;
    });
  }

  onReceiverChosen(receiver: WarehouseCustomerCompany) {
    this.chosenReceiver = receiver;
  }

  saveReceiver() {
    this.invoiceForm.controls['receiverCompany'].setValue(this.chosenReceiver);
    this.closeReceiverModal();
  }

  chooseGoods() {
    this.openGoodsModal();
    let goods: Goods;
    const subscription = this.goodsService.goodsForOutgoingInvoice$.subscribe(res => {
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

  openReceiverModal() {
    $('#receiverModal').foundation('open');
  }

  closeReceiverModal() {
    $('#receiverModal').foundation('close');
  }

  openGoodsModal() {
    $('#goodsModal').foundation('open');
  }

  closeGoodsModal() {
    $('#goodsModal').foundation('close');
  }

}
