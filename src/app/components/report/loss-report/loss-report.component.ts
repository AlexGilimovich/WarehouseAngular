import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-loss-report',
  templateUrl: './loss-report.component.html',
  styleUrls: ['./loss-report.component.scss']
})
export class LossReportComponent implements OnInit {
	lossReportForm: FormGroup;
  requestInProcess = false;

	constructor(private reportService: ReportService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
	  this.createForm();
    this.reportService.configureDatepicker(this.lossReportForm);
  }

  createForm() {
	  this.lossReportForm = this.fb.group({
		  startDate: ['', Validators.compose([Validators.required, this.reportService.dateValidator])],
		  endDate: ['', Validators.compose([Validators.required, this.reportService.dateValidator])]
	  });
  }
  getLossReport(){
	  this.reportService.getLossReport(this.lossReportForm, this.route);
  }
  private requestIsInProcess() {
    this.requestInProcess = true;
  }
}
