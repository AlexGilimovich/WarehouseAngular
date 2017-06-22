import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsStatusSearchComponent } from './goods-status-search.component';

describe('GoodsStatusSearchComponent', () => {
  let component: GoodsStatusSearchComponent;
  let fixture: ComponentFixture<GoodsStatusSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsStatusSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsStatusSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
