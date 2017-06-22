import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActListContainerComponent } from './act-list-container.component';

describe('ActListContainerComponent', () => {
  let component: ActListContainerComponent;
  let fixture: ComponentFixture<ActListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
