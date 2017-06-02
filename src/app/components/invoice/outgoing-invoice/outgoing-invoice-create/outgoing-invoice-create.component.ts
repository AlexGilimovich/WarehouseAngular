import {Component, OnInit} from '@angular/core';
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
import {TransportCompanyChoiceComponent} from "../../../tr-company/tr-company-choice/tr-company-choice.component";
import {CustomerChoiceComponent} from "../../../customer/customer-choice/customer-choice.component";
declare const $: any;

@Component({
  selector: 'app-outgoing-invoice-create',
  templateUrl: './outgoing-invoice-create.component.html',
  styleUrls: ['./outgoing-invoice-create.component.scss'],
  providers: [InvoiceService, GoodsService]
})
export class OutgoingInvoiceCreateComponent implements OnInit {
  invoiceForm: FormGroup;
  goodsList: Goods[] = [];
  units: Unit[] = [];

  constructor(private invoiceService: InvoiceService,
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

  saveTransport(company: TransportCompany) {
    this.invoiceForm.controls['transportCompany'].setValue(company);
    this.closeTransportModal();
  }

  saveReceiver(receiver: WarehouseCustomerCompany) {
    this.invoiceForm.controls['receiverCompany'].setValue(receiver);
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
