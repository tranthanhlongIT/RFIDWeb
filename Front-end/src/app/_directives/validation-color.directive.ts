import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appValidationColor]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidationColorDirective, multi: true }]
})
export class ValidationColorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName = '';

  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    return this.forbiddenName ? this.forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
      : null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
}