import { TestBed, inject } from '@angular/core/testing';

import { ActSearchService } from './act-search.service';

describe('ActSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActSearchService]
    });
  });

  it('should ...', inject([ActSearchService], (service: ActSearchService) => {
    expect(service).toBeTruthy();
  }));
});
