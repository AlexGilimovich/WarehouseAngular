import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeGoodsListComponent } from './scheme-goods-list.component';

describe('SchemeGoodsListComponent', () => {
  let component: SchemeGoodsListComponent;
  let fixture: ComponentFixture<SchemeGoodsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeGoodsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeGoodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
