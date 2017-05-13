import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActContainerComponent } from './act-container.component';

describe('ActContainerComponent', () => {
  let component: ActContainerComponent;
  let fixture: ComponentFixture<ActContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
