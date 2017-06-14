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
  goodsEntryCount: number;
  @ViewChild(GoodsModalAnchorDirective) goodsAnchor: GoodsModalAnchorDirective;
  goodsModalRef: ComponentRef<GoodsCreateComponent>;
  transportModal: any;
  supplierModal: any;
  goodsModal: any;

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
    console.log(invoice);
    this.invoiceService.saveIncomingInvoice(invoice).subscribe(data => {
      this.location.back();
    });
  }

  createGoods() {
    this.openGoodsModal();
    let goods: Goods;
    const subscription = this.goodsService.goodsCreated$.subscribe(res => {
      goods = res;
      this.goodsList.push(goods);
      this.changeGoodsEntryCount();
      subscription.unsubscribe();
      this.closeGoodsModal();
    });
  }

  deleteGoods(goods: Goods) {
    this.goodsList = this.invoiceService.deleteGoodsFromArray(this.goodsList, goods);
  }

  saveTransport(company: TransportCompany) {
    this.invoiceForm.controls['transportCompany'].setValue(company);
    this.closeTransportModal();
  }

  saveSupplier(supplier: WarehouseCustomerCompany) {
    this.invoiceForm.controls['supplierCompany'].setValue(supplier);
    this.closeSupplierModal();
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
    this.goodsModalRef = this.goodsAnchor.createGoods();
  }

  closeGoodsModal(subscription?: Subscription) {
    $('#goodsModal').foundation('close');
    this.goodsModalRef.destroy();
  }

  private configureModals(){
    this.transportModal = $('#transportModal').foundation();
    this.supplierModal = $('#supplierModal').foundation();
    this.goodsModal = $('#goodsModal').foundation();
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
  }

  private changeGoodsEntryCount() {
    let count = 0;
    this.goodsList.forEach(item => {
      count += Number(item.price);
    });
    this.goodsEntryCount = count;
  }
}
