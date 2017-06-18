import {
  Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {IncomingInvoice} from '../incoming-invoice';
import {InvoiceService} from '../../invoice.service';
import {TransportCompanyService} from '../../../tr-company/tr-company.service';
import {WarehouseCustomerCompanyService} from '../../../customer/customer.service';
import {TransportCompany} from '../../../tr-company/tr-company';
import {WarehouseCustomerCompany} from '../../../customer/customer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Goods} from '../../../goods/goods';
import {GoodsService} from '../../../goods/goods.service';
import {GoodsCreateComponent} from '../../../goods/goods-create/goods-create.component';
import {Unit} from '../../../goods/unit';
import {CustomerChoiceComponent} from '../../../customer/customer-choice/customer-choice.component';
import {TransportCompanyChoiceComponent} from '../../../tr-company/tr-company-choice/tr-company-choice.component';
import {GoodsModalAnchorDirective} from '../../../goods/goods-modal-anchor.directive';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import 'foundation-datepicker';
declare const $: any;

@Component({
  selector: 'app-incoming-invoice-create',
  templateUrl: './incoming-invoice-create.component.html',
  styleUrls: ['./incoming-invoice-create.component.scss'],
  providers: [InvoiceService, TransportCompanyService, GoodsService]
})
export class IncomingInvoiceCreateComponent implements OnInit, OnDestroy {
  invoiceForm: FormGroup;
  goodsList: Goods[] = [];
  goodsEntryCount: string;
  @ViewChild(GoodsModalAnchorDirective) goodsAnchor: GoodsModalAnchorDirective;
  goodsModalRef: ComponentRef<GoodsCreateComponent>;
  transportModal: any;
  supplierModal: any;
  goodsModal: any;
  goodsModalSubscription: Subscription;
  isIssueDateNotValid: boolean;

  constructor(private invoiceService: InvoiceService,
              private goodsService: GoodsService,
              private formBuilder: FormBuilder,
              private location: Location) {
    this.invoiceForm = this.formBuilder.group({
      'number': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\d]*$/)])],
      'issueDate': ['', Validators.compose([Validators.required])],
      'transportCompany': ['', Validators.compose([Validators.required])],
      'supplierCompany': ['', Validators.compose([Validators.required])],
      'transportNumber': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\d]*$/)])],
      'transportName': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\d]*$/)])],
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
    const invoice = this.invoiceService.mapIncomingInvoiceFromForm(form);
    invoice.goods = this.goodsList;
    invoice.goodsEntryCount = this.goodsEntryCount;
    this.invoiceService.saveIncomingInvoice(invoice).subscribe(data => {
      this.location.back();
    });
  }

  createGoods() {
    this.openGoodsModal();
    let goods: Goods;
    this.goodsModalSubscription = this.goodsService.goodsCreated$.subscribe(res => {
      goods = res;
      this.goodsList.push(goods);
      this.changeGoodsEntryCount();
      this.closeGoodsModal();
    });
  }

  openGoodsModal() {
    this.goodsModalRef = this.goodsAnchor.createGoods();
    $('#goodsModal').foundation('open');
  }

  closeGoodsModal() {
    this.goodsModalRef.destroy();
    $('#goodsModal').foundation('close');
  }

  deleteGoods(goods: Goods) {
    this.goodsList = this.invoiceService.deleteGoodsFromArray(this.goodsList, goods);
    this.changeGoodsEntryCount();
  }

  saveTransport(company: TransportCompany) {
    this.invoiceForm.controls['transportCompany'].setValue(company);
    $('#transportModal').foundation('close');
  }

  closeTransportModal() {
    $('#transportModal').foundation('close');
  }

  saveSupplier(supplier: WarehouseCustomerCompany) {
    this.invoiceForm.controls['supplierCompany'].setValue(supplier);
    $('#supplierModal').foundation('close');
  }

  checkIssueDate(value: string) {
    this.isIssueDateNotValid = this.invoiceForm.controls['issueDate'].hasError('required')
      && this.invoiceForm.get('issueDate').touched && value === '';
  }

  private configureModals() {
    this.transportModal = $('#transportModal').foundation();
    this.supplierModal = $('#supplierModal').foundation();
    this.goodsModal = $('#goodsModal').foundation();
    $(document).on('closed.zf.reveal', '#goodsModal[data-reveal]', () => {
      if (this.goodsModalSubscription != null) {
        this.goodsModalSubscription.unsubscribe();
      }
    });
  }

  private clearModals() {
    this.transportModal.remove();
    this.supplierModal.remove();
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
}
