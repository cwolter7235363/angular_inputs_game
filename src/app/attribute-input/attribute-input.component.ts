import { Component, forwardRef, Optional, Injector, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer, NgForm, NgControl, NG_VALIDATORS, FormControl, ReactiveFormsModule, FormGroupDirective, FormGroup } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-attribute-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="formRef">
    <input style="visibility: hidden" type="text" [formControlName]="controlKey">
  </form>
  <!-- Display the value of the input field outside of the input -->
  <p>Born on {{formRef.controls[controlKey]?.value?.birthTimestamp | date: 'medium'}}</p> <!-- Use async pipe to subscribe to mountTime -->
  
  
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
  mountTime: BehaviorSubject<Date | undefined> = new BehaviorSubject<Date | undefined>(undefined); // Change to BehaviorSubject
  @Input() formRef: FormGroup = new FormGroup({} as any);
  @Input() controlKey: string = '';

  constructor(@Optional() private controlContainer: ControlContainer) {
    this.parentForm = controlContainer;
  }

  ngOnInit() {
    const initialValue = this.formRef.controls[this.controlKey].value;
  
    // Modify the initialValue object as needed
    if (!initialValue.birthTimestamp)
      initialValue.birthTimestamp = new Date().toISOString();
    
    if (!initialValue.uuid)
      initialValue.uuid = uuidv4();
  


    // Set the modified value back on the form control
    this.formRef.controls[this.controlKey].setValue(initialValue);
  }

  onChange = (quantity: number) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  writeValue(value: any) {

      // Add the birthTimestamp attribute with the current date-time
      value.birthTimestamp = new Date().toISOString();

      this.formRef.controls[this.controlKey].setValue(value);

  
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