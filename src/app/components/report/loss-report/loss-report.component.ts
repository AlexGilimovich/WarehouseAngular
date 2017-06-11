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

	constructor(private reportService: ReportService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
	  this.createForm();
  }

  createForm() {
	  this.lossReportForm = this.fb.group({
		  startDate: ['', Validators.required],
		  endDate: ['', Validators.required]
	  });
  }
  getLossReport(){
	  this.reportService.getLossReport(this.lossReportForm, this.route);
  }
}
