import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCompanyContainerComponent } from './tr-company-container.component';

describe('TransportCompanyContainerComponent', () => {
  let component: TransportCompanyContainerComponent;
  let fixture: ComponentFixture<TransportCompanyContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportCompanyContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCompanyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
