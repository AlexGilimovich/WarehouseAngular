import {Component, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
import {GoodsModalAnchorDirective} from "../../../goods/goods-modal-anchor.directive";
import {GoodsChoiceComponent} from "../../../goods/goods-choice/goods-choice.component";
import {Location} from '@angular/common';
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
  goodsEntryCount: number;
  @ViewChild(GoodsModalAnchorDirective) goodsAnchor: GoodsModalAnchorDirective;
  goodsModal: ComponentRef<GoodsChoiceComponent>;

  constructor(private invoiceService: InvoiceService,
              private goodsService: GoodsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private location: Location) {
    this.invoiceForm = this.formBuilder.group({
      'number': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\d]*$/)])],
      'issueDate': ['', Validators.compose([Validators.required])],
      'transportCompany': ['', Validators.compose([Validators.required])],
      'receiverCompany': ['', Validators.compose([Validators.required])],
      'transportNumber': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\d]*$/)])],
      'transportName': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\d]*$/)])],
      // todo invisible driver if not auto
      'driver': [],
      'description': ['']
    });
  }

  ngOnInit() {
    $('body').foundation();
  }

  onSubmit(form: FormGroup) {
    const invoice = this.invoiceService.mapOutgoingInvoiceFromForm(form);
    invoice.goods = this.goodsList;
    invoice.goodsEntryCount = this.goodsEntryCount;
    console.log(invoice);
    this.invoiceService.saveOutgoingInvoice(invoice).subscribe(data => {
      this.location.back();
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
      this.changeGoodsEntryCount();
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
    this.goodsModal = this.goodsAnchor.chooseGoods();
  }

  closeGoodsModal() {
    $('#goodsModal').foundation('close');
    this.goodsModal.destroy();
  }

  private changeGoodsEntryCount() {
    let count = 0;
    this.goodsList.forEach(item => {
      count += Number(item.price);
    });
    this.goodsEntryCount = count;
  }
}
