import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesLossReportComponent } from './employees-loss-report.component';

describe('EmployeesLossReportComponent', () => {
  let component: EmployeesLossReportComponent;
  let fixture: ComponentFixture<EmployeesLossReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesLossReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesLossReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
