import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsListContainerComponent } from './goods-list-container.component';

describe('GoodsListContainerComponent', () => {
  let component: GoodsListContainerComponent;
  let fixture: ComponentFixture<GoodsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
