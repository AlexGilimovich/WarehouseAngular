import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TransportCompany} from '../../../tr-company/tr-company';
import {WarehouseCustomerCompany} from '../../../customer/customer';
import {InvoiceService} from '../../invoice.service';
import {TransportCompanyService} from '../../../tr-company/tr-company.service';
import {WarehouseCustomerCompanyService} from '../../../customer/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IncomingInvoice} from '../incoming-invoice';
import {InvoiceStatus} from '../../invoice-status';
import {Goods} from "../../../goods/goods";
import {LoginService} from "../../../login/login.service";
import {Location} from "@angular/common";
import {invoiceStatuses} from "../../invoice.module";

@Component({
  selector: 'app-incoming-invoice-details',
  templateUrl: './incoming-invoice-details.component.html',
  styleUrls: ['./incoming-invoice-details.component.scss'],
  providers: [InvoiceService]
})
export class IncomingInvoiceDetailsComponent implements OnInit {
  id: number;
  invoiceForm: FormGroup;
  goodsList: Goods[];
  status: InvoiceStatus;
  invoiceStatus = InvoiceStatus;

  constructor(private invoiceService: InvoiceService,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
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
      'goodsEntryCount': ['']
    });
  }

  ngOnInit() {
    this.id = this.invoiceService.parseIdParam(this.route);
    this.invoiceService.getIncomingInvoiceById(this.id).subscribe(data => {
      const invoice = data;
      this.mapFormFromInvoice(invoice);
      this.goodsList = invoice.goods;
      this.status = InvoiceStatus[invoice.status];
      // todo show status history
    });
  }

  finishChecking() {
    const status = InvoiceStatus.CHECKED;
    this.invoiceService.updateInvoiceStatus(this.id, status).subscribe(data => {
      this.location.back();
    });
  }

  createMismatchAct() {
    // this.router.navigateByUrl();
    this.router.navigate(['../../../acts/create', this.loginService.getLoggedUser().warehouse.idWarehouse],{queryParams: {invoiceId: this.id}, relativeTo:this.route});
    // const status = InvoiceStatus.CHECKED;//todo moved this logic into act create component
    // this.invoiceService.updateInvoiceStatus(this.id, status).subscribe();
  }

  finishCompleting(){
    const status = InvoiceStatus.COMPLETED;
    this.invoiceService.updateInvoiceStatus(this.id, status).subscribe(data => {
      this.router.navigate(['../../../warehousecompany',
        this.loginService.getLoggedUser().warehouse.warehouseCompany.idWarehouseCompany,
        'warehouse', this.loginService.getLoggedUser().warehouse.idWarehouse, 'scheme'],
        {relativeTo: this.route});
    });
  }

  placeGoods(){
    //this.router.navigate(['./warehousecompany', this.loginService.getLoggedUser().warehouse.warehouseCompany.idWarehouseCompany, 'warehouse', this.loginService.getLoggedUser().warehouse.idWarehouse, 'scheme'], {relativeTo: this.route});
    this.router.navigate(['warehouse', this.loginService.getLoggedUser().warehouse.idWarehouse, 'place'], {relativeTo: this.route});
  }

  isManager() {
    return this.loginService.getLoggedUser().hasRole('ROLE_MANAGER');
  }

  isController() {
    return this.loginService.getLoggedUser().hasRole('ROLE_CONTROLLER');
  }

  private mapFormFromInvoice(invoice: IncomingInvoice) {
    this.invoiceForm.controls['number'].setValue(invoice.number);
    this.invoiceForm.controls['issueDate'].setValue(invoice.issueDate);
    this.invoiceForm.controls['transportCompany'].setValue(invoice.transportCompany);
    this.invoiceForm.controls['supplierCompany'].setValue(invoice.supplierCompany);
    this.invoiceForm.controls['transportNumber'].setValue(invoice.transportNumber);
    this.invoiceForm.controls['transportName'].setValue(invoice.transportName);
    if (invoice.driver != null) {
      this.invoiceForm.controls['driver'].setValue(invoice.driver);
    }
    this.invoiceForm.controls['description'].setValue(invoice.description);
    this.invoiceForm.controls['goodsEntryCount'].setValue(invoice.goodsEntryCount);
  }

}
