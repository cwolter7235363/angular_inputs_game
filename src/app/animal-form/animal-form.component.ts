
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
    _t7.control.setValue({name: this.randNames[Math.floor(Math.random() * this.randNames.length)], ...newRandomAnimal});
}
  form: FormGroup = new FormGroup({});
  stringifiedForm: any;
  

  constructor(private fb: FormBuilder, private formService: FormService, private IDBService: IndexedDBService) {}


  

  randNames = [
    "Fluffy",
    "Spot",
    "Rex",
    "Whiskers",
    "Buddy",
    "Mittens",
    "Max",
    "Luna"
  ]


  ngOnInit() {
    // Generate random attributes for the two animals
    const animalAttributes1 = {...this.generateRandomAnimal(), name: this.randNames[Math.floor(Math.random() * this.randNames.length)]};
    const animalAttributes2 = {...this.generateRandomAnimal(), name: this.randNames[Math.floor(Math.random() * this.randNames.length)]};
  
    // Create the form with two animal inputs initialized with random attributes
    this.form = this.fb.group({
      animalInput1: new FormControl(animalAttributes1),
      animalInput2: new FormControl(animalAttributes2),
    }, { validators: [genderMismatchValidator, speciesMismatchValidator] });
  
    this.formService.setFormGroup(this.form);
  }

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
        breedingCooldown: Math.floor(Math.random() * 86400) + 1, // 1 second to 1 day
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

  combineInputsAndAddNew() {
    const animal1 = this.form.get('animalInput1')?.value as Attributes;
    const animal2 = this.form.get('animalInput2')?.value as Attributes;
    if (animal1.physical.gender === animal2.physical.gender)
    {
      alert('Cannot combine two animals of the same gender');
      return;
    }


    if (!animal1 || !animal2) {
      console.error('One or both inputs are missing');
      return;
    }
  
    // Combine physical attributes
    const combinedPhysical = {
      gender: Gender.MALE, // Placeholder, you might want to handle this differently
      size: this.getRandomElement(["small", "medium", "large"]), // Example strategy
      weight: this.getRandomElement(["light", "heavy", "muscular"]), // Example strategy
      bodyStructure: this.getRandomElement(["slim", "bulky"]), // Example strategy
    };
  
    // Combine combat skills
    const combinedCombatSkills = {
      attackPower: Math.round((animal1.combatSkills.attackPower + animal2.combatSkills.attackPower) / 2),
      defense: Math.round((animal1.combatSkills.defense + animal2.combatSkills.defense) / 2),
      speed: this.getRandomElement(["slow", "average", "fast"]), // Ensure this matches AttributeShape
      agility: this.getRandomElement(["low", "moderate", "high"]), // Ensure this matches AttributeShape
      stamina: Math.round((animal1.combatSkills.stamina + animal2.combatSkills.stamina) / 2),
    };
  
    // Combine elemental attributes
    const combinedElemental = {
      elementalAffinities: Array.from(new Set([...animal1.elemental.elementalAffinities, ...animal2.elemental.elementalAffinities])),
      elementalAttacks: animal1.elemental.elementalAttacks || animal2.elemental.elementalAttacks,
    };
  
    // Combine special abilities
    const combinedSpecialAbilities = {
      uniqueSkills: Array.from(new Set([...animal1.specialAbilities.uniqueSkills, ...animal2.specialAbilities.uniqueSkills])),
      passiveTraits: Array.from(new Set([...animal1.specialAbilities.passiveTraits, ...animal2.specialAbilities.passiveTraits])),
    };
  
    // Combine breeding attributes
    const combinedBreeding = {
      geneticTraits: Array.from(new Set([...animal1.breeding.geneticTraits, ...animal2.breeding.geneticTraits])),
      mutationChance: Math.round((animal1.breeding.mutationChance + animal2.breeding.mutationChance) / 2),
      breedingCooldown: Math.round((animal1.breeding.breedingCooldown + animal2.breeding.breedingCooldown) / 2),
    };
  
    // Combine appearance (randomly select from either animal)
    const combinedAppearance = {
      coloration: this.getRandomElement([animal1.appearance.coloration, animal2.appearance.coloration]),
      hornsOrSpikes: this.getRandomElement([animal1.appearance.hornsOrSpikes, animal2.appearance.hornsOrSpikes]),
      skinTexture: this.getRandomElement([animal1.appearance.skinTexture, animal2.appearance.skinTexture]),
    };
  
    // Combine behavioral attributes
    const combinedBehavioral = {
      temperament: this.getRandomElement([animal1.behavioral.temperament, animal2.behavioral.temperament]),
      habitatPreference: Array.from(new Set([...animal1.behavioral.habitatPreference, ...animal2.behavioral.habitatPreference])),
    };
  
    // Combine rarity and class (simplified strategy)
    const combinedRarityAndClass = {
      rarity: this.getRandomElement([animal1.rarityAndClass.rarity, animal2.rarityAndClass.rarity]), // Example strategy
      class: this.getRandomElement([animal1.rarityAndClass.class, animal2.rarityAndClass.class]), // Example strategy
    };
  
    // Combine breeding mechanics
    const combinedBreedingMechanics = {
      compatibility: Array.from(new Set([...animal1.breedingMechanics.compatibility, ...animal2.breedingMechanics.compatibility])),
      offspringTraits: Array.from(new Set([...animal1.breedingMechanics.offspringTraits, ...animal2.breedingMechanics.offspringTraits])),
      breedingBonuses: Array.from(new Set([...animal1.breedingMechanics.breedingBonuses, ...animal2.breedingMechanics.breedingBonuses])),
    };
  
    // Create a new input with the combined values
    const combinedAttributes: Attributes = {
      // @ts-ignore
      physical: combinedPhysical,
      // @ts-ignore
      combatSkills: combinedCombatSkills,
      elemental: combinedElemental,
      specialAbilities: combinedSpecialAbilities,
      breeding: combinedBreeding,
      appearance: combinedAppearance,
      behavioral: combinedBehavioral,
      rarityAndClass: combinedRarityAndClass,
      breedingMechanics: combinedBreedingMechanics,
    };
  
    // Add the new input to the form
    this.form.addControl('combinedAnimalInput', new FormControl(combinedAttributes));
  }

  onSubmit() {
    this.combineInputsAndAddNew();
    //console.log(this.form?.value);
  }
}