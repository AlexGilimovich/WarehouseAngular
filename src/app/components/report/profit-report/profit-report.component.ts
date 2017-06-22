import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Warehouse } from "../../warehouse/warehouse";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profit-report',
  templateUrl: './profit-report.component.html',
  styleUrls: ['./profit-report.component.scss']
})
export class ProfitReportComponent implements OnInit {
	warehouseList: Warehouse[] = [];
	profitReportForm: FormGroup;
	requestInProcess = false;

	constructor(private reportService: ReportService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
	  this.warehouseList = this.reportService.getWarehouseList();
	  this.createForm();
	  this.reportService.configureDatepicker(this.profitReportForm);
  }

  createForm() {
	  this.profitReportForm = this.fb.group({
		  idWarehouse: ['', Validators.required],
		  startDate: ['', Validators.compose([Validators.required, this.reportService.dateValidator])],
		  endDate: ['', Validators.compose([Validators.required, this.reportService.dateValidator])]
	  });
  }

  getProfitReport(){
	  this.reportService.getProfitReport(this.profitReportForm, this.route);
  }
  private requestIsInProcess() {
	  this.requestInProcess = true;
  }

}
