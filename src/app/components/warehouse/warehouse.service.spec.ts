/**
 * Created by Lenovo on 13.05.2017.
 */
import { TestBed, inject } from '@angular/core/testing';

import {WarehouseService} from './warehouse.service';

describe('WarehouseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseService]
    });
  });

  it('should ...', inject([WarehouseService], (service: WarehouseService) => {
    expect(service).toBeTruthy();
  }));
});
