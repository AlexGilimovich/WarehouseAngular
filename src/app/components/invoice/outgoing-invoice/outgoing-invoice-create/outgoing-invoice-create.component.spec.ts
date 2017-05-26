import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingInvoiceCreateComponent } from './outgoing-invoice-create.component';

describe('OutgoingInvoiceCreateComponent', () => {
  let component: OutgoingInvoiceCreateComponent;
  let fixture: ComponentFixture<OutgoingInvoiceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingInvoiceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingInvoiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
