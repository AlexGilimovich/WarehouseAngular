import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LossReportComponent } from './loss-report.component';

describe('LossReportComponent', () => {
  let component: LossReportComponent;
  let fixture: ComponentFixture<LossReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LossReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LossReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
