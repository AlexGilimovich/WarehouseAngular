/**
 * Created by Lenovo on 14.05.2017.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {WarehouseSchemeInfoComponent} from "./warehouse.scheme.component";

describe('WarehouseSchemeInfoComponent', () => {
  let component: WarehouseSchemeInfoComponent;
  let fixture: ComponentFixture<WarehouseSchemeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseSchemeInfoComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseSchemeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
