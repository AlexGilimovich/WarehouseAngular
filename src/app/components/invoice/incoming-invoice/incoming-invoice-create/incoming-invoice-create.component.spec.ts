import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingInvoiceCreateComponent } from './incoming-invoice-create.component';

describe('IncomingInvoiceCreateComponent', () => {
  let component: IncomingInvoiceCreateComponent;
  let fixture: ComponentFixture<IncomingInvoiceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingInvoiceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingInvoiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
