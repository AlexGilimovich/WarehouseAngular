import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Warehouse } from "../../warehouse/warehouse";
/*declare var $: any;*/

@Component({
  selector: 'app-report-container',
  templateUrl: './report-container.component.html',
  styleUrls: ['./report-container.component.scss']
})
export class ReportContainerComponent implements OnInit {
	warehouseList: Warehouse[] = [];
	constructor(private reportService : ReportService) { }

  ngOnInit() {
	  this.reportService.setWarehouseList();
	 /* $("body").foundation();*/
}

}
