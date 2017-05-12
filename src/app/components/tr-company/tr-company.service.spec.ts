import { TestBed, inject } from '@angular/core/testing';

import { TransportCompanyService } from './tr-company.service';

describe('TransportCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportCompanyService]
    });
  });

  it('should ...', inject([TransportCompanyService], (service: TransportCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
