import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCompanyChoiceComponent } from './tr-company-choice.component';

describe('TransportCompanyChoiceComponent', () => {
  let component: TransportCompanyChoiceComponent;
  let fixture: ComponentFixture<TransportCompanyChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportCompanyChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCompanyChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
