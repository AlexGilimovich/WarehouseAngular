import {
  Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
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
import {CustomerChoiceComponent} from "../../../customer/customer-choice/customer-choice.component";
import {TransportCompanyChoiceComponent} from "../../../tr-company/tr-company-choice/tr-company-choice.component";
import {GoodsModalAnchorDirective} from "../../../goods/goods-modal-anchor.directive";
declare const $: any;

@Component({
  selector: 'app-incoming-invoice-create',
  templateUrl: './incoming-invoice-create.component.html',
  styleUrls: ['./incoming-invoice-create.component.scss'],
  providers: [InvoiceService, TransportCompanyService, GoodsService]
})
export class IncomingInvoiceCreateComponent implements OnInit {
  invoiceForm: FormGroup;
  goodsList: Goods[] = [];
  units: Unit[] = [];
  @ViewChild(GoodsModalAnchorDirective) goodsAnchor: GoodsModalAnchorDirective;
  goodsModal: ComponentRef<GoodsCreateComponent>;

  constructor(private invoiceService: InvoiceService,
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
    this.goodsModal = this.goodsAnchor.createGoods();
  }

  closeGoodsModal() {
    $('#goodsModal').foundation('close');
    this.goodsModal.destroy();
  }
}
