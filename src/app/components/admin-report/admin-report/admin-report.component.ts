import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { AdminReportService } from '../admin-report.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {
	adminReportForm: FormGroup;
	requestInProcess = false;

	constructor(private reportService: AdminReportService, private fb: FormBuilder, private route: ActivatedRoute) { }

	ngOnInit() {
		this.createForm();
		this.reportService.configureDatepicker(this.adminReportForm);
	}

	createForm() {
		this.adminReportForm = this.fb.group({
			startDate: ['', Validators.compose([Validators.required, this.reportService.dateValidator])],
			endDate: ['', Validators.compose([Validators.required, this.reportService.dateValidator])]
		});
	}
	getAdminReport() {
		this.reportService.getAdminReport(this.adminReportForm, this.route);
	}
	private requestIsInProcess() {
		this.requestInProcess = true;
	}

}
