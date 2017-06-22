import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GoodsService } from '../goods.service';
import { Goods } from '../goods';
import { StorageType } from '../storageType';
import { Unit } from '../unit';
import { StorageSpaceType } from '../../warehouse-scheme/storage-space-type';
import { LoginService } from '../../login/login.service';


@Component({
  selector: 'app-goods-create',
  templateUrl: './goods-create.component.html',
  styleUrls: ['./goods-create.component.scss']
})
export class GoodsCreateComponent implements OnInit {
  private goodsForm: FormGroup;
  private warehouseId: number;

  private quantityUnits: Unit[];
  private weightUnits: Unit[];
  private priceUnits: Unit[];

  private storageTypes: StorageSpaceType[];


  constructor(private location: Location,
              private fb: FormBuilder,
              private goodsService: GoodsService,
              private loginService: LoginService) {
    this.warehouseId = this.loginService.getLoggedUser().warehouse.idWarehouse;
    this.goodsForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\s\d]*$/)])],
      'quantity': ['', Validators.compose([Validators.required, this.minValue])],
      'quantityUnit': ['шт', Validators.compose([Validators.required])],
      'weight': ['', Validators.compose([Validators.required, this.minValue])],
      'weightUnit': ['кг', Validators.compose([Validators.required])],
      'price': ['', Validators.compose([Validators.required, this.minValue])],
      'priceUnit': ['руб', Validators.compose([Validators.required])],
      'storageType': ['Отапливаемое помещение', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.goodsService.getStorageSpaceTypes().subscribe(
      (res) => {
        this.storageTypes = [...res];
      },
      (err) => {
        console.error(err);
      }
    );
    this.goodsService.getQuantityUnits().subscribe(
      (res) => {
        this.quantityUnits = [...res];
      },
      (err) => {
        console.error(err);
      }
    );
    this.goodsService.getPriceUnits().subscribe(
      (res) => {
        this.priceUnits = [...res];
      },
      (err) => {
        console.error(err);
      }
    );
    this.goodsService.getWeightUnits().subscribe(
      (res) => {
        this.weightUnits = [...res];
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private save(): void {
    let goods: Goods = new Goods();
    goods.name = this.goodsForm.controls['name'].value;
    goods.quantity = this.goodsForm.controls['quantity'].value;
    goods.weight = this.goodsForm.controls['weight'].value;
    goods.price = this.goodsForm.controls['price'].value;
    goods.storageType = new StorageType(null, this.goodsForm.controls['storageType'].value);
    goods.warehouseId = this.warehouseId;
    // goods.status = new GoodsStatus();
    // goods.status.name = this.goodsForm.controls['currentStatus'].value;
    goods.quantityUnit = new Unit(null, this.goodsForm.controls['quantityUnit'].value);
    goods.weightUnit = new Unit(null, this.goodsForm.controls['weightUnit'].value);
    goods.priceUnit = new Unit(null, this.goodsForm.controls['priceUnit'].value);
    this.goodsService.goodsCreatedEvent(goods);
  }

  private close() {
    // if (confirm("Изменения не были сохранены. Вы уверены, что хотите продолжить?"))
    this.location.back();
  }

  private minValue(c: FormControl) {
    if (!c.value && c.value !== 0) {
      return true;
    }
    const errors: any = {};
    if (c.value <= 0) {
      errors.outOfBounds = true;
    }
    return errors;
  }

}
