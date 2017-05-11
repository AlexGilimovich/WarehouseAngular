import { TestBed, inject } from '@angular/core/testing';

import { HttpAuthService } from './httpAuth.service.ts';

describe('HttpAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpAuthService]
    });
  });

  it('should ...', inject([HttpAuthService], (service: HttpAuthService) => {
    expect(service).toBeTruthy();
  }));
});
