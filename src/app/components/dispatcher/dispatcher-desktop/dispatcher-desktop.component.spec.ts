import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherDesktopComponent } from './dispatcher-desktop.component';

describe('DispatcherDesktopComponent', () => {
  let component: DispatcherDesktopComponent;
  let fixture: ComponentFixture<DispatcherDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatcherDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatcherDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
