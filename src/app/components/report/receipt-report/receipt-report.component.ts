import { Component, OnInit, Input } from '@angular/core';
import { Warehouse } from "../../warehouse/warehouse";
import { ReportService } from '../report.service';

@Component({
  selector: 'app-receipt-report',
  templateUrl: './receipt-report.component.html',
  styleUrls: ['./receipt-report.component.scss']
})
export class ReceiptReportComponent implements OnInit {
	warehouseList: Warehouse[] = [];
	constructor(private reportService: ReportService) { }

	ngOnInit() {
		this.warehouseList = this.reportService.getWarehouseList();	
	}

}
