import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActGoodsComponent } from './act-goods.component';

describe('ActGoodsComponent', () => {
  let component: ActGoodsComponent;
  let fixture: ComponentFixture<ActGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
