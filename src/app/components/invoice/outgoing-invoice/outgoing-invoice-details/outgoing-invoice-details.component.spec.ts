import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingInvoiceDetailsComponent } from './outgoing-invoice-details.component';

describe('OutgoingInvoiceDetailsComponent', () => {
  let component: OutgoingInvoiceDetailsComponent;
  let fixture: ComponentFixture<OutgoingInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
