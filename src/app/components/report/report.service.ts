import { Injectable } from '@angular/core';
import { LoginService } from "../login/login.service";
import { WarehouseService } from "../warehouse/warehouse.service";
import { Warehouse } from "../warehouse/warehouse";
import { Report } from './report';
import { HttpAuthService } from "../login/httpAuth.service";
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from "@angular/forms";

const RECEIPT_REPORT_URL: string = "http://localhost:8080/web/web/report/receipt/";
const PROFIT_REPORT_URL: string = "http://localhost:8080/web/web/report/profit/";
const LOSS_REPORT_URL: string = "http://localhost:8080/web/web/report/total_loss/";
const EMPLOYEE_LOSS_REPORT_URL: string = "http://localhost:8080/web/web/report/warehouse_loss_with_liable_employees/";

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
		this.httpAuthService.post(RECEIPT_REPORT_URL, JSON.stringify(reportDTO), new RequestOptions({
			headers: (new Headers({ ["Accept"]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })),
			responseType: ResponseContentType.ArrayBuffer
		}))
			.subscribe(
			res => {

				let blob = new Blob([res.arrayBuffer()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

				let a = document.createElement("a");
				a.href = window.URL.createObjectURL(blob);
				a.download = 'ReceiptReport.xlsx';
				document.body.appendChild(a);
				a.click();
				this.router.navigate(["../"], { relativeTo: route });
				//this.location.back();			
			},
			error => {
				alert("Report generation failed. Try again later");
				this.router.navigate(["../"], { relativeTo: route });
			}
			);
	}

	getProfitReport(profitReportForm: FormGroup, route: ActivatedRoute): void {
		let fileReader = new FileReader();
		let initialUrl = PROFIT_REPORT_URL;
		let fullUrl: string;
		let idWarehouse = profitReportForm.controls['idWarehouse'].value;
		let startDate = profitReportForm.controls['startDate'].value;
		let endDate = profitReportForm.controls['endDate'].value;
		fullUrl = PROFIT_REPORT_URL + "?dateStart=" + startDate + "&dateEnd=" + endDate + "&idWarehouse=" + idWarehouse;
		this.httpAuthService.get(fullUrl, new RequestOptions({
			headers: (new Headers({ ["Accept"]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })),
			responseType: ResponseContentType.ArrayBuffer
		}))
			.subscribe(
			res => {

				let blob = new Blob([res.arrayBuffer()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

				let a = document.createElement("a");
				a.href = window.URL.createObjectURL(blob);
				a.download = 'ProfitReport.xlsx';
				document.body.appendChild(a);
				a.click();
				this.router.navigate(["../"], { relativeTo: route });
				//this.location.back();			
			},
			error => {
				alert("Report generation failed. Try again later");
				this.router.navigate(["../"], { relativeTo: route });
			}
			);
	}

	getLossReport(lossReportForm: FormGroup, route: ActivatedRoute): void {
		let fileReader = new FileReader();
		let reportDTO: Report = new Report();
		reportDTO.startDate = lossReportForm.controls['startDate'].value;
		reportDTO.endDate = lossReportForm.controls['endDate'].value;
		this.httpAuthService.post(LOSS_REPORT_URL, JSON.stringify(reportDTO), new RequestOptions({
			headers: (new Headers({ ["Accept"]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })),
			responseType: ResponseContentType.ArrayBuffer
		}))
			.subscribe(
			res => {

				let blob = new Blob([res.arrayBuffer()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

				let a = document.createElement("a");
				a.href = window.URL.createObjectURL(blob);
				a.download = 'LossReport.xlsx';
				document.body.appendChild(a);
				a.click();
				this.router.navigate(["../"], { relativeTo: route });
				//this.location.back();			
			},
			error => {
				alert("Report generation failed. Try again later");
				this.router.navigate(["../"], { relativeTo: route });
			}
			);
	}

	getEmployeeLossReport(lossReportForm: FormGroup, route: ActivatedRoute): void {
		let fileReader = new FileReader();
		let reportDTO: Report = new Report();
		reportDTO.idWarehouse = lossReportForm.controls['idWarehouse'].value;
		reportDTO.startDate = lossReportForm.controls['startDate'].value;
		reportDTO.endDate = lossReportForm.controls['endDate'].value;
		this.httpAuthService.post(EMPLOYEE_LOSS_REPORT_URL, JSON.stringify(reportDTO), new RequestOptions({
			headers: (new Headers({ ["Accept"]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })),
			responseType: ResponseContentType.ArrayBuffer
		}))
			.subscribe(
			res => {

				let blob = new Blob([res.arrayBuffer()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

				let a = document.createElement("a");
				a.href = window.URL.createObjectURL(blob);
				a.download = 'WarehouseLossReportWithLiableEmployees.xlsx';
				document.body.appendChild(a);
				a.click();
				this.router.navigate(["../"], { relativeTo: route });
				//this.location.back();			
			},
			error => {
				alert("Report generation failed. Try again later");
				this.router.navigate(["../"], { relativeTo: route });
			}
			);
	}
}