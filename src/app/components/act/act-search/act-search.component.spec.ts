import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActSearchComponent } from './act-search.component';

describe('ActSearchComponent', () => {
  let component: ActSearchComponent;
  let fixture: ComponentFixture<ActSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
