import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../../warehouse/warehouse";
import { ReportService } from '../report.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees-loss-report',
  templateUrl: './employees-loss-report.component.html',
  styleUrls: ['./employees-loss-report.component.scss']
})
export class EmployeesLossReportComponent implements OnInit {
	warehouseList: Warehouse[] = [];
	employeeLossReportForm: FormGroup;

	constructor(private reportService: ReportService, private fb: FormBuilder, private route: ActivatedRoute) { }

	ngOnInit() {
		this.warehouseList = this.reportService.getWarehouseList();
		this.createForm();
	}
	createForm() {
		this.employeeLossReportForm = this.fb.group({
			idWarehouse: ['', Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required]
		});
	}

	getEmployeeLossReport(){
		this.reportService.getEmployeeLossReport(this.employeeLossReportForm, this.route);
	}

}
