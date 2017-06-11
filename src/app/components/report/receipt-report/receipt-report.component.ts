import { Component, OnInit, Input } from '@angular/core';
import { Warehouse } from "../../warehouse/warehouse";
import { ReportService } from '../report.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from "@angular/forms";
import { Report } from '../report';
import { HttpAuthService } from "../../login/httpAuth.service";
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
/*import { dateOrderValidator } from '../forbidden-date.directive';*/


@Component({
  selector: 'app-receipt-report',
  templateUrl: './receipt-report.component.html',
  styleUrls: ['./receipt-report.component.scss']
})
export class ReceiptReportComponent implements OnInit {
	warehouseList: Warehouse[] = [];
	receiptReportForm: FormGroup;
	constructor(private reportService: ReportService,
				private fb: FormBuilder,
				private route: ActivatedRoute
				) { }

	ngOnInit() {
		this.warehouseList = this.reportService.getWarehouseList();	
		this.createForm();
	}


	createForm() {
		this.receiptReportForm = this.fb.group({
			idWarehouse: ['', Validators.required],
			startDate: ['', Validators.required /*, dateOrderValidator()*/],
			endDate: ['', Validators.required]
		});
	}

	private getReceiptReport() {
		this.reportService.getReceiptReport(this.receiptReportForm, this.route);				
	}

}
