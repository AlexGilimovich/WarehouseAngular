import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingInvoiceGoodsCreateComponent } from './outgoing-invoice-goods-create.component';

describe('OutgoingInvoiceGoodsCreateComponent', () => {
  let component: OutgoingInvoiceGoodsCreateComponent;
  let fixture: ComponentFixture<OutgoingInvoiceGoodsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingInvoiceGoodsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingInvoiceGoodsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
