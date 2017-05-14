/**
 * Created by Lenovo on 09.05.2017.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {WarehouseCompanyComponent} from "./warehouse.company.component";

describe('WarehouseCompanyComponent', () => {
  let component: WarehouseCompanyComponent;
  let fixture: ComponentFixture<WarehouseCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseCompanyComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
