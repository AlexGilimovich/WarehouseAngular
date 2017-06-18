import { TestBed, inject } from '@angular/core/testing';

import { CompaniesFinanceService } from './companies-finance.service';

describe('CompaniesFinanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompaniesFinanceService]
    });
  });

  it('should ...', inject([CompaniesFinanceService], (service: CompaniesFinanceService) => {
    expect(service).toBeTruthy();
  }));
});
