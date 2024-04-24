import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { AnimalFormComponent } from "./app/animal-form/animal-form.component";
import { AttributeInputComponent } from "./app/attribute-input/attribute-input.component";
import { AnimalService } from './app/animal-service.service'; // Import AnimalService
import { CommonModule } from '@angular/common';
import { MonsterCardComponent } from "./app/monster-card/monster-card.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <div class="star-wars-theme">
  <h1>Ruk´s Animal Hoe</h1>
    <app-animal-form/>
    <a target="_blank" href="https://angular.dev/overview" class="learn-more-link">
      Learn more about Angular
    </a>
    <div *ngIf="animals" class="flex flex-col gap-5">
    <app-monster-card *ngFor="let beast of animals" [monster]="beast"></app-monster-card>
    </div>
  </div>
  `,
    imports: [AnimalFormComponent, AttributeInputComponent, CommonModule, MonsterCardComponent]
})
export class App implements OnInit {
  animals: any[] = [];
  name = 'Angular';

  constructor(private animalService: AnimalService) {} // Use AnimalService

  ngOnInit(): void {
    this.animalService.animals$.subscribe(animals => {
      this.animals = animals;
      console.log('Loaded animals:', animals);
      // Process or display the animals as needed
    }, error => {
      console.error('Failed to load animals:', error);
    });
  }
}

bootstrapApplication(App);