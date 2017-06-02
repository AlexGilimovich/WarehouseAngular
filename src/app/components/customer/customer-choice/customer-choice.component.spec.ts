import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChoiceComponent } from './customer-choice.component';

describe('CustomerChoiceComponent', () => {
  let component: CustomerChoiceComponent;
  let fixture: ComponentFixture<CustomerChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
