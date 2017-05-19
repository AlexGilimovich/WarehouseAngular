import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsActsComponent } from './goods-acts.component';

describe('GoodsActsComponent', () => {
  let component: GoodsActsComponent;
  let fixture: ComponentFixture<GoodsActsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsActsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsActsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
