import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReportContainerComponent } from './admin-report-container/admin-report-container.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpinnerModule } from "angular2-spinner/dist";
import { AdminReportService } from './admin-report.service';

export const adminReportRoutes: Routes = [
	/*{
		path: '',
		redirectTo: 'systemReport',
		pathMatch: 'full'
	},*/
	{
		path: "systemReport",
		component: AdminReportComponent
	}
];

@NgModule({
  imports: [
	  CommonModule,
	  RouterModule,
	  FormsModule,
	  ReactiveFormsModule,
	  SpinnerModule
  ],
  declarations: [AdminReportContainerComponent, AdminReportComponent],
  providers: [AdminReportService]
})
export class AdminReportModule { }
