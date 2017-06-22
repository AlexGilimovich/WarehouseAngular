import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingInvoiceDetailsComponent } from './incoming-invoice-details.component';

describe('IncomingInvoiceDetailsComponent', () => {
  let component: IncomingInvoiceDetailsComponent;
  let fixture: ComponentFixture<IncomingInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
