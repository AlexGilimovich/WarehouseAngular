import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCompanyCreateComponent } from './tr-company-create.component';

describe('TransportCompanyCreateComponent', () => {
  let component: TransportCompanyCreateComponent;
  let fixture: ComponentFixture<TransportCompanyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportCompanyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCompanyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
