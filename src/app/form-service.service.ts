import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  private formGroup: FormGroup | undefined;

  setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  addControl(name: string, control: FormControl) {
    if (this.formGroup) {
      this.formGroup.addControl(name, control);
    }
  }
}