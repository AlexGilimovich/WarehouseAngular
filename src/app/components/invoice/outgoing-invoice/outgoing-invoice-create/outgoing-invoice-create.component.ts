import {Component, ComponentRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {Subscription} from "rxjs/Subscription";
import {NotificationService} from "../../../notification/notification.service";
import {OutgoingInvoice} from "../outgoing-invoice";
declare const $: any;

@Component({
  selector: 'app-outgoing-invoice-create',
  templateUrl: './outgoing-invoice-create.component.html',
  styleUrls: ['./outgoing-invoice-create.component.scss'],
  providers: [InvoiceService, GoodsService]
})
export class OutgoingInvoiceCreateComponent implements OnInit, OnDestroy {
  invoiceForm: FormGroup;
  goodsList: Goods[] = [];
  goodsEntryCount: string;
  @ViewChild(GoodsModalAnchorDirective) goodsAnchor: GoodsModalAnchorDirective;
  goodsModalRef: ComponentRef<GoodsChoiceComponent>;
  transportModal: any;
  receiverModal: any;
  goodsModal: any;
  goodsModalSubscription: Subscription;
  isIssueDateNotValid: boolean;

  constructor(private invoiceService: InvoiceService,
              private goodsService: GoodsService,
              private formBuilder: FormBuilder,
              private location: Location,
              private notificationService: NotificationService) {
    this.invoiceForm = this.formBuilder.group({
      'number': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\d]*$/)])],
      'issueDate': ['', Validators.compose([Validators.required])],
      'transportCompany': ['', Validators.compose([Validators.required])],
      'receiverCompany': ['', Validators.compose([Validators.required])],
      'transportNumber': ['', Validators.compose([Validators.required])],
      'transportName': ['', Validators.compose([Validators.required])],
      // todo invisible driver if not auto
      'driver': [],
      'description': ['']
    });
    this.isIssueDateNotValid = false;
  }

  ngOnInit() {
    this.configureModals();
    this.configureDatepicker();
  }

  ngOnDestroy() {
    this.clearModals();
  }

  onSubmit(form: FormGroup) {
    const invoice = this.invoiceService.mapOutgoingInvoiceFromForm(form);
    invoice.goods = this.goodsList;
    invoice.goodsEntryCount = this.goodsEntryCount;
    this.saveInvoice(invoice);
  }

  saveTransport(company: TransportCompany) {
    this.invoiceForm.controls['transportCompany'].setValue(company);
    $('#transportModal').foundation('close');
  }

  closeTransportModal() {
    $('#transportModal').foundation('close');
  }

  saveReceiver(receiver: WarehouseCustomerCompany) {
    this.invoiceForm.controls['receiverCompany'].setValue(receiver);
    $('#receiverModal').foundation('close');
  }

  chooseGoods() {
    this.openGoodsModal();
    let goods: Goods;
    this.goodsModalSubscription = this.goodsService.goodsForOutgoingInvoice$.subscribe(res => {
      goods = res;
      this.goodsList.push(goods);
      this.changeGoodsEntryCount();
      this.closeGoodsModal();
    });
  }

  deleteGoods(goods: Goods) {
    this.goodsList = this.invoiceService.deleteGoodsFromArray(this.goodsList, goods);
    this.changeGoodsEntryCount();
  }

  openGoodsModal() {
    this.goodsModalRef = this.goodsAnchor.chooseGoods();
    $('#goodsModal').foundation('open');
  }

  closeGoodsModal() {
    $('#goodsModal').foundation('close');
    this.goodsModalRef.destroy();
  }

  checkIssueDate(value: string) {
    this.isIssueDateNotValid = this.invoiceForm.controls['issueDate'].hasError('required')
      && this.invoiceForm.get('issueDate').touched && value === '';
  }

  private configureModals() {
    this.transportModal = $('#transportModal').foundation();
    this.receiverModal = $('#receiverModal').foundation();
    this.goodsModal = $('#goodsModal').foundation();
    $(document).on('closed.zf.reveal', '#goodsModal[data-reveal]', () => {
      if (this.goodsModalSubscription != null) {
        this.goodsModalSubscription.unsubscribe();
      }
    });
  }

  private clearModals() {
    this.transportModal.remove();
    this.receiverModal.remove();
    this.goodsModal.remove();
  }

  private configureDatepicker() {
    $(document).ready(() => {
      $('#issueDate').fdatepicker({
        format: 'dd/mm/yyyy',
        disableDblClickSelection: true,
        leftArrow: '<<',
        rightArrow: '>>'
      }).on('changeDate', element => {
        const date = element.date;
        this.setIssueDate(date);
      });
    });
  }

  private setIssueDate(date: Date) {
    this.invoiceForm.controls['issueDate'].setValue(date);
    this.isIssueDateNotValid = this.invoiceForm.controls['issueDate'].hasError('required')
      && this.invoiceForm.get('issueDate').touched;
  }

  private changeGoodsEntryCount() {
    let count = 0;
    this.goodsList.forEach(item => {
      count += Number(item.price);
    });
    this.goodsEntryCount = count.toString() + ' руб';
  }

  private saveInvoice(invoice: OutgoingInvoice) {
    const invoiceExistsSubscription = this.invoiceService.invoiceExistsByNumber(invoice.number).subscribe(data => {
      const exists = (data === 'true');
      if (exists) {
        this.notificationService.invoiceExists();
      } else {
        this.invoiceService.saveOutgoingInvoice(invoice).subscribe(result => {
          this.notificationService.invoiceCreated();
          this.location.back();
        });
      }
      invoiceExistsSubscription.unsubscribe();
    });
  }
}
