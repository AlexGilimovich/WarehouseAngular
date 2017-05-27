import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingInvoiceListComponent } from './outgoing-invoice-list.component';

describe('OutgoingInvoiceListComponent', () => {
  let component: OutgoingInvoiceListComponent;
  let fixture: ComponentFixture<OutgoingInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingInvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
