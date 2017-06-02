import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TransportCompanyListComponent} from "./tr-company-list/tr-company-list.component";
import {TransportCompanyService} from "./tr-company.service";
import { TransportCompanyCreateComponent } from './tr-company-create/tr-company-create.component';
import { TransportCompanyDetailsComponent } from './tr-company-details/tr-company-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TransportCompanyChoiceComponent } from './tr-company-choice/tr-company-choice.component';

export const transportCompanyRoutes: Routes = [
  {
    path: '',
    component: TransportCompanyListComponent
  },
  {
    path: 'new',
    component: TransportCompanyCreateComponent
  },
  {
    path: ':id',
    component: TransportCompanyDetailsComponent
  }
];


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TransportCompanyChoiceComponent],
  declarations: [TransportCompanyListComponent, TransportCompanyCreateComponent, TransportCompanyDetailsComponent, TransportCompanyChoiceComponent],
  providers: [TransportCompanyService]
})
export class TransportCompanyModule { }
