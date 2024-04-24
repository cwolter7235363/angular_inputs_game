import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { AnimalFormComponent } from "./app/animal-form/animal-form.component";
import { AttributeInputComponent } from "./app/attribute-input/attribute-input.component";
import { IndexedDBService } from './app/indexed-db.service';
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
    <ul *ngIf="animals">
      
    <app-monster-card *ngFor="let beast of animals" [monster]="beast"></app-monster-card>
      <li *ngFor="let animal of animals">{{ animal }}</li>
    </ul>
  </div>
  `,
    imports: [AnimalFormComponent, AttributeInputComponent, CommonModule, MonsterCardComponent]
})
export class App implements OnInit{
  animals: any[] = [];
  name = 'Angular';
  constructor(private IDBService: IndexedDBService) {}
  ngOnInit(): void {
    this.IDBService.loadAllAnimals()
    .then(animals => {
      console.log('Loaded animals:', animals);
      this.animals = animals;
      // Process or display the animals as needed
    })
    .catch(error => {
      console.error('Failed to load animals:', error);
    });
  }


}

bootstrapApplication(App);
