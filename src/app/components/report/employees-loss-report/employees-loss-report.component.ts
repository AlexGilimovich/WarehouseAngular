import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../../warehouse/warehouse";
import { ReportService } from '../report.service';

@Component({
  selector: 'app-employees-loss-report',
  templateUrl: './employees-loss-report.component.html',
  styleUrls: ['./employees-loss-report.component.scss']
})
export class EmployeesLossReportComponent implements OnInit {

	warehouseList: Warehouse[] = [];

	constructor(private reportService: ReportService) { }

	ngOnInit() {
		this.warehouseList = this.reportService.getWarehouseList();
	}

}
