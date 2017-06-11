import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesLossReportComponent } from './employees-loss-report/employees-loss-report.component';
import { LossReportComponent } from './loss-report/loss-report.component';
import { ProfitReportComponent } from './profit-report/profit-report.component';
import { ReceiptReportComponent } from './receipt-report/receipt-report.component';
import { ReportContainerComponent } from './report-container/report-container.component';
import { RouterModule, Routes } from "@angular/router";
import { ReportService } from "./report.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export const reportRoutes: Routes = [
	{
		path: "receipt",
		component: ReceiptReportComponent
	},
	{
		"path": "profit",
		component: ProfitReportComponent
	},
	{
		"path": "loss",
		component: LossReportComponent
	},
	{
		"path": "employee-loss",
		component: EmployeesLossReportComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [EmployeesLossReportComponent, LossReportComponent, ProfitReportComponent, ReceiptReportComponent, ReportContainerComponent],
  providers: [ReportService]
})
export class ReportModule { }
