import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { AnimalFormComponent } from "./app/animal-form/animal-form.component";
import { AttributeInputComponent } from "./app/attribute-input/attribute-input.component";
import { AnimalService } from './app/animal-service.service'; // Import AnimalService
import { CommonModule } from '@angular/common';
import { MonsterCardComponent } from "./app/monster-card/monster-card.component";
import { MonsterSelectionService } from './app/service/monster-selection-service/monster-selection-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
<div class="star-wars-theme">
<h1>Ruk´s Animal Hoe</h1>
  <app-animal-form/>
  <div *ngIf="filteredAnimals.length > 0" class="flex flex-col gap-5">
  <app-monster-card *ngFor="let beast of filteredAnimals" [monster]="beast"></app-monster-card>
  </div>
</div>
`,
  imports: [AnimalFormComponent, AttributeInputComponent, CommonModule, MonsterCardComponent]
})
export class App implements OnInit {
animals: any[] = [];
name = 'Angular';
filteredAnimals: any[] = [];


constructor(private animalService: AnimalService, private selectionService: MonsterSelectionService) {}

ngOnInit(): void {
  this.animalService.animals$.subscribe(animals => {
    this.animals = animals;
    console.log('Loaded animals:', animals);
    // Update filteredAnimals right after animals are loaded
    this.updateFilteredAnimals();
  }, error => {
    console.error('Failed to load animals:', error);
  });

  this.selectionService.getSelectedMonstersObservable().subscribe(selectedAnimals => {
    console.log('Selected monsters:', selectedAnimals);
    // Update filteredAnimals whenever the selection changes
    this.updateFilteredAnimals(selectedAnimals);
  });
}

// Utility method to update filteredAnimals based on the current selection
updateFilteredAnimals(selectedAnimals: any[] = this.selectionService.getSelectedMonsters()): void {
  this.filteredAnimals = this.animals.filter(animal => !selectedAnimals.includes(animal));
}
}

bootstrapApplication(App);