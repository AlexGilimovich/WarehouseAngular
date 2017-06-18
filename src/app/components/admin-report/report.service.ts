import { Injectable } from '@angular/core';
import { LoginService } from "../login/login.service";
import { WarehouseService } from "../warehouse/warehouse.service";
import { Warehouse } from "../warehouse/warehouse";
import { Report } from './report';
import { HttpAuthService } from "../login/httpAuth.service";
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from "@angular/forms";
import { Host } from "../../util/host";
declare const $: any;
import 'foundation-datepicker';

const OWNER_REPORT_URL: string = Host.getURL() + "siteOwnerReport/";

@Injectable()
export class ReportService {
	private warehouseList: Warehouse[] = [];
	constructor(private loginService: LoginService, 
				private warehouseService: WarehouseService,
				private fb: FormBuilder,
				private httpAuthService: HttpAuthService,
				private router: Router) { }
	setWarehouseList(): void {
		let idWarehouseCompany = this.loginService.getLoggedUser().warehouseCompany.idWarehouseCompany;

		this.warehouseService.getWarehouse(idWarehouseCompany, -1, -1).subscribe(data => {
				this.warehouseList = data;
		});
	}
	getWarehouseList(): Warehouse[] {
		return this.warehouseList;
	}
	getReceiptReport(receiptReportForm: FormGroup, route: ActivatedRoute): void {
		let fileReader = new FileReader();
		let reportDTO: Report = new Report();
		reportDTO.idWarehouse = receiptReportForm.controls['idWarehouse'].value;
		reportDTO.startDate = receiptReportForm.controls['startDate'].value;
		reportDTO.endDate = receiptReportForm.controls['endDate'].value;
		this.httpAuthService.post(OWNER_REPORT_URL, JSON.stringify(reportDTO), new RequestOptions({
			headers: (new Headers({ ["Accept"]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })),
			responseType: ResponseContentType.ArrayBuffer
		}))
			.subscribe(
			res => {
				let blob = new Blob([res.arrayBuffer()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
				let a = document.createElement("a");
				a.href = window.URL.createObjectURL(blob);
				a.download = 'WarehouseSystemReport.xlsx';
				document.body.appendChild(a);
				a.click();
				this.router.navigate(["../"], { relativeTo: route });		
			},
			error => {
				console.error(error);
				this.router.navigate(["../"], { relativeTo: route });
			}
			);
	}


	dateValidator(control: AbstractControl) {
		if(control !== undefined){
			var parent = control.parent;
			if(parent !== undefined){
				let errors: any = {};
				let startDate, endDate;
				let startDateControl, endDateControl;
				startDateControl = parent.get('startDate');
				endDateControl = parent.get('endDate');
				if (startDateControl.value !== "") {
					startDate = Date.parse(startDateControl.value);
				}
				else {
					return true;
				}
				if (endDateControl.value !== "") {
					endDate = Date.parse(endDateControl.value);
				}
				else {
					return true;
				}
				if (startDate > endDate) {
					if (control.parent.controls["endDate"] === control) {
						errors.invalidEndDate = true;
					}
					if (control.parent.controls["startDate"] === control) {
						errors.invalidStartDate = true;
					}
				}
				else {
					if(startDateControl.hasError('invalidStartDate')){
						parent.controls['startDate'].setErrors({ 'invalidStartDate': null });
						startDateControl.updateValueAndValidity();
					}
					if(endDateControl.hasError('invalidEndDate')){
						parent.controls['endDate'].setErrors({ 'invalidEndDate': null });
						endDateControl.updateValueAndValidity();
					}
					/*parent.controls['startDate'].setErrors({ 'invalidStartDate': false });
					parent.controls['endDate'].setErrors({ 'invalidEndDate': false });*/
					return true;
				}
				return errors;
			}
		}
	}

	configureDatepicker(formGroup: FormGroup) {
		$(document).ready(() => {
			$('#startDate').fdatepicker({
				format: 'dd/mm/yyyy',
				disableDblClickSelection: true,
				leftArrow: '<<',
				rightArrow: '>>'
			}).on('changeDate', element => {
				const date = element.date;
				this.setStartDate(date, formGroup);
			});
		});
		$(document).ready(() => {
			$('#endDate').fdatepicker({
				format: 'dd/mm/yyyy',
				disableDblClickSelection: true,
				leftArrow: '<<',
				rightArrow: '>>'
			}).on('changeDate', element => {
				const date = element.date;
				this.setEndDate(date, formGroup);
			});
		});
	}

	setStartDate(date: Date, formGroup: FormGroup) {
		formGroup.controls['startDate'].setValue(date);
	}
	setEndDate(date: Date, formGroup: FormGroup) {
		formGroup.controls['endDate'].setValue(date);
	}
		
}