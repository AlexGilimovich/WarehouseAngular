import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance.component';
import { FormsModule } from '@angular/forms';
import { FinanceService } from './finance.service';

export const storageTypeWithId: Map<number, string> = new Map([
  [1, 'Отапливаемое помещение'],
  [2, 'Неотапливаемое помещение'],
  [3, 'Холодильная камера'],
  [4, 'Открытая площадка'],
  [5, 'Камера глубокой заморозки']
]);

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
