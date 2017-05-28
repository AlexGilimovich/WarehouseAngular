/**
 * Created by Lenovo on 14.05.2017.
 */
import { TestBed, inject } from '@angular/core/testing';

import {WarehouseSchemeService} from './warehouse-scheme.service';

describe('WarehouseSchemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseSchemeService]
    });
  });

  it('should ...', inject([WarehouseSchemeService], (service: WarehouseSchemeService) => {
    expect(service).toBeTruthy();
  }));
});
