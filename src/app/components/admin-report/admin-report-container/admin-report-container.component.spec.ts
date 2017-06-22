import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportContainerComponent } from './admin-report-container.component';

describe('AdminReportContainerComponent', () => {
  let component: AdminReportContainerComponent;
  let fixture: ComponentFixture<AdminReportContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
