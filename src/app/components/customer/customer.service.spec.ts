import { TestBed, inject } from '@angular/core/testing';

import { WarehouseCustomerCompanyService } from './customer.service';

describe('WarehouseCustomerCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseCustomerCompanyService]
    });
  });

  it('should ...', inject([WarehouseCustomerCompanyService], (service: WarehouseCustomerCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
