import { TestBed, inject } from '@angular/core/testing';

import { ActService } from './act.service';

describe('ActService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActService]
    });
  });

  it('should ...', inject([ActService], (service: ActService) => {
    expect(service).toBeTruthy();
  }));
});
