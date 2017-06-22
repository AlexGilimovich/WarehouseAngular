import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesFinanceComponent } from './companies-finance.component';

describe('CompaniesFinanceComponent', () => {
  let component: CompaniesFinanceComponent;
  let fixture: ComponentFixture<CompaniesFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
