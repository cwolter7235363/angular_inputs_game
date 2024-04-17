import { Component, forwardRef, Optional, Injector, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer, NgForm, NgControl, NG_VALIDATORS, FormControl, ReactiveFormsModule, FormGroupDirective, FormGroup } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-attribute-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="formRef">
    <input style="visibility: hidden" type="text" [formControlName]="controlKey">
  </form>
  <!-- Display the value of the input field outside of the input -->
  <p>Born on {{mountTime | date: 'medium'}}</p>
  
  <ng-template #elseBlock>No value</ng-template>
  <!-- Displaying the parent form's value -->
  <!-- This line might not be necessary if you're displaying individual control values -->
  <p *ngIf="parentForm?.value">Stringified Value: {{ formRef.controls[controlKey]?.value | json }}</p>

  <p *ngIf="controlKey">Control Key: {{ controlKey }}</p>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: forwardRef(() => AttributeInputComponent),
    }
  ]
})
export class AttributeInputComponent implements ControlValueAccessor, OnInit  {
  nameControl = new FormControl('');
  parentForm: ControlContainer | null = null; // Changed type to ControlContainer
  quantity = 0;
  mountTime: Date | undefined; // Property to store the mount time
  @Input() formRef: FormGroup = new FormGroup({} as any);
  @Input() controlKey: string = '';

  constructor(@Optional() private controlContainer: ControlContainer) {
    this.parentForm = controlContainer;
  }

  onChange = (quantity: number) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  ngOnInit() {
    this.mountTime = new Date(); // Capture the mount time
  }
  writeValue(quantity: number) {
    this.quantity = quantity;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}