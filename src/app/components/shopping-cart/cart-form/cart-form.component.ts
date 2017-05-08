import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss']
})
export class CartFormComponent implements OnInit {
  cartForm: FormGroup;

  ngOnInit() {
  }

  constructor(fb: FormBuilder) {
    this.cartForm = fb.group({
      "cardType": [''],
      "cardNo": ['', Validators.compose([Validators.required, cardValidator])],
      "fullName": ['', Validators.pattern(/^[a-zA-Zа-яА-Я\s]*$/)]
    });
  }

  onSubmit(value: any): void {

  }
}

function cardValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^123/)) {/*todo*/
    return {invalidCardNo: true};
  }
}
