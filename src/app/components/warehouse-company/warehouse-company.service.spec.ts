/**
 * Created by Lenovo on 13.05.2017.
 */
import { TestBed, inject } from '@angular/core/testing';

import {WarehouseCompanyService} from './warehouse-company.service';

describe('WarehouseCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseCompanyService]
    });
  });

  it('should ...', inject([WarehouseCompanyService], (service: WarehouseCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
