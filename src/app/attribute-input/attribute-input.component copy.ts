import { Component, forwardRef, Optional, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer, NgForm, NgControl } from '@angular/forms';
import { Animal } from '../../types';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-attribute-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p *ngIf="value?.name; else elseBlock">{{value?.name}}</p>
    <ng-template #elseBlock>No value</ng-template>
    <!-- Displaying the parent form's value -->
    <p *ngIf="parentForm?.value">Parent Form Value: {{ parentForm?.value }}</p>
    <!-- Displaying the control key -->
    <p *ngIf="controlKey">Control Key: {{ controlKey }}</p>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttributeInputComponent),
      multi: true
    }
  ]
})
export class AttributeInputComponent implements ControlValueAccessor {
  value: Animal | null = null;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  // Accessing the parent form and control key
  parentForm: NgForm | null = null;
  controlKey: string | null = null;

  constructor(@Optional() private controlContainer: ControlContainer, private injector: Injector) {
    if (this.controlContainer) {
      this.parentForm = this.controlContainer as NgForm;
    }

    // Delay the retrieval of NgControl to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      const ngControl = this.injector.get(NgControl, null);
      if (ngControl && ngControl.name) {
        // @ts-ignore
        this.controlKey = ngControl.name;
      }
    });
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}