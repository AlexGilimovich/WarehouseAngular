/**
 * Created by Lenovo on 15.05.2017.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {WarehouseCompanyCreateComponent} from "./warehouse.company.create.component";

describe('WarehouseCompanyCreateComponent', () => {
  let component: WarehouseCompanyCreateComponent;
  let fixture: ComponentFixture<WarehouseCompanyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseCompanyCreateComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCompanyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
