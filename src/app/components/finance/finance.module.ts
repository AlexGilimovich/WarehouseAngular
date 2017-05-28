import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FinanceComponent} from './finance.component';
import {FormsModule} from "@angular/forms";
import {FinanceService} from "./finance.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [FinanceComponent],
  providers: [FinanceService]
})
export class FinanceModule {
}
