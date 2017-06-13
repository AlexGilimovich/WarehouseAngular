import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function dateOrderValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let startDate, endDate;
    if (control.value !== "") {
      startDate = Date.parse(control.value);
    }
    else {
      return null;
    }
    let parent = control.parent;
    let date = parent.get('endDate');
    let value = date.value;
    if (control.parent.get('endDate').value !== "") {
      startDate = Date.parse(control.parent.get('endDate').value);
    }
    else {
      return null;
    }
    return startDate > endDate ? { 'forbiddenDate': { startDate } } : null;
  };
}

@Directive({
  selector: '[forbiddenDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator, OnChanges {
  @Input() forbiddenName: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['forbiddenDate'];
    if (change) {
      this.valFn = dateOrderValidator();
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
