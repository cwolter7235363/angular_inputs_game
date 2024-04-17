import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../form-service.service';
import { AttributeInputComponent } from '../attribute-input/attribute-input.component';
import { CommonModule } from '@angular/common';


export enum Gender {
  MALE,
  FEMALE
}

@Component({
  selector: 'app-animal-form',
  standalone: true,
  templateUrl: './animal-form.component.html',
  imports: [ReactiveFormsModule, AttributeInputComponent, CommonModule]
})
export class AnimalFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  stringifiedForm: any;
  

  constructor(private fb: FormBuilder, private formService: FormService) {}

  ngOnInit() {
    // Create the form with two animal inputs
    this.form = this.fb.group({
      animalInput1: new FormControl({gender: Gender.MALE, height: 50, weight: 100, name: "hubertus"}), // First animal input
      animalInput2: new FormControl({gender: Gender.FEMALE, height: 30, weight: 70, name: "huberta"}),  // Second animal 
    });
    this.formService.setFormGroup(this.form);
    console.log(this.form);
    //this.stringifiedForm = JSON.stringify(this.form);
  }

  get formControlsArray() {
    return Object.entries(this.form.controls).map(([name, control]) => ({name, control}));
  }

  combineInputsAndAddNew() {
    // Retrieve the values of the two inputs
    const animal1 = this.form.get('animalInput1')?.value;
    const animal2 = this.form.get('animalInput2')?.value;
  
    if (!animal1 || !animal2) {
      console.error('One or both inputs are missing');
      return;
    }
  
    // Combine the values
    const combinedName = animal1.name + ' & ' + animal2.name;
    const combinedHeight = animal1.height + animal2.height;
    const combinedWeight = animal1.weight + animal2.weight;
    const combinedGender = 'Combined'; // Assuming you want a placeholder value for gender
  
    // Create a new input with the combined values
    const combinedInput = {
      name: combinedName,
      height: combinedHeight,
      weight: combinedWeight,
      gender: combinedGender // This is a placeholder, adjust as needed
    };
  
    // Add the new input to the form
    this.form.addControl('combinedAnimalInput', new FormControl(combinedInput));
  }

  onSubmit() {
    this.combineInputsAndAddNew();
    //console.log(this.form?.value);
  }
}