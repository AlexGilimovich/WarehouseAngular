/**
 * Created by Lenovo on 24.04.2017.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'child-comp',
  template: `<h2>Добро пожаловать {{name}}!</h2>`,
  styles: [`h2, p {color:red;}`]
})
export class ChildComponent {
  name= "Евгений";
}
