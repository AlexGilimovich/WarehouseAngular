import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsContainerComponent } from './goods-container.component';

describe('GoodsContainerComponent', () => {
  let component: GoodsContainerComponent;
  let fixture: ComponentFixture<GoodsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
