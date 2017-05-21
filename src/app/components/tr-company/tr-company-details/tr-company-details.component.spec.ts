import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCompanyDetailsComponent } from './tr-company-details.component';

describe('TransportCompanyDetailsComponent', () => {
  let component: TransportCompanyDetailsComponent;
  let fixture: ComponentFixture<TransportCompanyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportCompanyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
