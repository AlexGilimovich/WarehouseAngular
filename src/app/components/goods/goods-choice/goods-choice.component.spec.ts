import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsChoiceComponent } from './goods-choice.component';

describe('GoodsChoiceComponent', () => {
  let component: GoodsChoiceComponent;
  let fixture: ComponentFixture<GoodsChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
