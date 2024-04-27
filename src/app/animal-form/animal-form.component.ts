
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../form-service.service';
import { AttributeInputComponent } from '../attribute-input/attribute-input.component';
import { CommonModule } from '@angular/common';
import { Animal, AttributeShape, Attributes, CombatSkillShape } from '../../types';
import { IndexedDBService } from '../indexed-db.service';
import MonsterData from "../resources/monsters.json";
import { genderMismatchValidator } from '../validators/GenderMismatchValidator';
import { speciesMismatchValidator } from '../validators/SpeciesMismatchValidator';
import { MonsterSelectionService } from '../service/monster-selection-service/monster-selection-service.service';
import { AnimalService } from '../animal-service.service';
import { v4 as uuidv4 } from 'uuid';
import { randSuperheroName } from '@ngneat/falso';
import { BreedingServiceService } from '../breeding-service.service';

export enum Gender {
  MALE,
  FEMALE
}

@Component({
  selector: 'app-animal-form',
  standalone: true,
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.css'],
  imports: [ReactiveFormsModule, AttributeInputComponent, CommonModule]
})
export class AnimalFormComponent implements OnInit {
saveToIndexedDB(_t7: { name: string; control: import("@angular/forms").AbstractControl<any,any>; }) {
  this.IDBService.addAnimal(_t7.control.value as Animal)
    .then(id => {
      // TODO: reload the saved animals? 
    
      console.log('Animal saved with ID:', id)
    })
    .catch(error => console.error('Could not save animal:', error));

}
reroll(_t7: { name: string; control: import("@angular/forms").AbstractControl<any,any>; }) {
    const newRandomAnimal = this.generateRandomAnimal();
    _t7.control.setValue({name: randSuperheroName(), ...newRandomAnimal});
}
  form: FormGroup = new FormGroup({});
  stringifiedForm: any;
  

  constructor(protected monsterSelectionService: MonsterSelectionService, private fb: FormBuilder, private formService: FormService, private IDBService: IndexedDBService, private animalService: AnimalService, private breedingService: BreedingServiceService) {}


  initForm() {
    this.form = this.fb.group({
      animalInput1: new FormControl(),
      animalInput2: new FormControl()
    }, { validators: [genderMismatchValidator, speciesMismatchValidator] });
  }


  ngOnInit() {
    this.monsterSelectionService.getSelectedMonstersObservable().subscribe(selectedMonsters => {
      // Initialize an empty form group
      this.form = this.fb.group({}, { validators: [genderMismatchValidator, speciesMismatchValidator] });
  
      // Check if the first monster is selected and add it to the form if it's not null
      if (selectedMonsters.length > 0 && selectedMonsters[0] !== null) {
        this.form.addControl('animalInput1', new FormControl(selectedMonsters[0]));
      }
  
      // Check if the second monster is selected and add it to the form if it's not null
      if (selectedMonsters.length > 1 && selectedMonsters[1] !== null) {
        this.form.addControl('animalInput2', new FormControl(selectedMonsters[1]));
      }
  
      // Set the form group in the form service
      this.formService.setFormGroup(this.form);
    });
  }


  // ngOnInit() {
  //   // Generate random attributes for the two animals
  //   const animalAttributes1 = {...this.generateRandomAnimal(), name: this.randNames[Math.floor(Math.random() * this.randNames.length)]};
  //   const animalAttributes2 = {...this.generateRandomAnimal(), name: this.randNames[Math.floor(Math.random() * this.randNames.length)]};
  
  //   // Create the form with two animal inputs initialized with random attributes
  //   this.form = this.fb.group({
  //     animalInput1: new FormControl(animalAttributes1),
  //     animalInput2: new FormControl(animalAttributes2),
  //   }, { validators: [genderMismatchValidator, speciesMismatchValidator] });
  
  //   this.formService.setFormGroup(this.form);
  // }

  getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  formErrors = {
    'genderMismatch': 'Animals cannot be of the same gender.',
    'speciesMismatch': 'These species are not compatible.'
  };
   
  getFormErrorKeys() {
    return Object.keys(this.form.errors || {});
  }
  

  addRandomAnimal($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.animalService.addAnimal({...this.generateRandomAnimal(), uuid: uuidv4()
      ,name: randSuperheroName()})
  
  }

  generateRandomAnimal(): Attributes {
    return {
      species: this.getRandomElement(MonsterData),
      physical: {
        gender: this.getRandomElement([Gender.MALE, Gender.FEMALE]),
        size: this.getRandomElement(["small", "medium", "large"]) as AttributeShape,
        weight: this.getRandomElement(["light", "heavy", "muscular"]),
        bodyStructure: this.getRandomElement(["slim", "bulky"]),
      },
      combatSkills: {
        attackPower: Math.floor(Math.random() * 100) + 1, // Assuming 1-100 range
        defense: Math.floor(Math.random() * 100) + 1,
        speed: this.getRandomElement(["slow", "average", "fast"]) as AttributeShape,
        agility: this.getRandomElement(["low", "moderate", "high"]) as AttributeShape,
        stamina: Math.floor(Math.random() * 100) + 1,
      },
      elemental: {
        elementalAffinities: [this.getRandomElement(["fire", "water", "thunder", "ice", "earth"])],
        elementalAttacks: Math.random() < 0.5,
      },
      specialAbilities: {
        uniqueSkills: [this.getRandomElement(["skill1", "skill2", "skill3"])],
        passiveTraits: [this.getRandomElement(["trait1", "trait2", "trait3"])],
      },
      breeding: {
        geneticTraits: [this.getRandomElement(["skill1", "skill2", "skill3"])],
        mutationChance: Math.floor(Math.random() * 101), // 0-100%
        breedingCooldown: Math.floor(Math.random() * 10) + 1, // 1 second to 1 day
      },
      appearance: {
        coloration: this.getRandomElement(["red", "blue", "green"]), // Example colors
        hornsOrSpikes: this.getRandomElement(["horns", "spikes", "none"]),
        skinTexture: this.getRandomElement(["smooth", "rough", "scaly"]),
      },
      behavioral: {
        temperament: this.getRandomElement(["aggressive", "docile", "territorial"]),
        habitatPreference: [this.getRandomElement(["fire", "water", "thunder", "ice", "earth"])],
      },
      rarityAndClass: {
        rarity: this.getRandomElement(["common", "rare", "legendary"]),
        class: this.getRandomElement(["elite", "boss"]),
      },
      breedingMechanics: {
        compatibility: [this.getRandomElement(["speciesA", "speciesB"])],
        offspringTraits: [this.getRandomElement(["skill1", "skill2", "skill3"])],
        breedingBonuses: [this.getRandomElement(["bonus1", "bonus2"])],
      },
    }
  }
  


  get formControlsArray() {
    return Object.entries(this.form.controls).map(([name, control]) => ({name, control}));
  }


  onSubmit() {
    this.breedingService.submitBreedingPair(this.form?.value.animalInput1, this.form?.value.animalInput2);


    // clear the form
    this.monsterSelectionService.clearSelection();
    this.form = this.fb.group({})
    //console.log(this.form?.value);
  }
}