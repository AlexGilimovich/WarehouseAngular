import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Warehouse } from "../../warehouse/warehouse";

@Component({
  selector: 'app-profit-report',
  templateUrl: './profit-report.component.html',
  styleUrls: ['./profit-report.component.scss']
})
export class ProfitReportComponent implements OnInit {
	warehouseList: Warehouse[] = [];

	constructor(private reportService: ReportService) { }

  ngOnInit() {
	  this.warehouseList = this.reportService.getWarehouseList();
  }

}
