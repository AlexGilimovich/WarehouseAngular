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

	constructor(private reportService: ReportService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
	  this.warehouseList = this.reportService.getWarehouseList();
	  this.createForm();
  }

  createForm() {
	  this.profitReportForm = this.fb.group({
		  idWarehouse: ['', Validators.required],
		  startDate: ['', Validators.required],
		  endDate: ['', Validators.required]
	  });
  }

  getProfitReport(){
	  this.reportService.getProfitReport(this.profitReportForm, this.route);
  }

}
