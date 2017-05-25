import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDesktopComponent } from './owner-desktop.component';

describe('OwnerDesktopComponent', () => {
  let component: OwnerDesktopComponent;
  let fixture: ComponentFixture<OwnerDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
