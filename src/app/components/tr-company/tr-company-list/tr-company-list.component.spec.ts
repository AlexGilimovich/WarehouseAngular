import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrCompanyListComponent } from './tr-company-list.component';

describe('TrCompanyListComponent', () => {
  let component: TrCompanyListComponent;
  let fixture: ComponentFixture<TrCompanyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrCompanyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
