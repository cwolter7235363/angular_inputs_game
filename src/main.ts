import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { AnimalFormComponent } from "./app/animal-form/animal-form.component";
import { AttributeInputComponent } from "./app/attribute-input/attribute-input.component";
import { IndexedDBService } from './app/indexed-db.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-animal-form/>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
    <ul *ngIf="animals">
    <li *ngFor="let animal of animals">{{ animal }}</li>
  </ul>

  `,
    imports: [AnimalFormComponent, AttributeInputComponent, CommonModule]
})
export class App implements OnInit{
  animals: any[] = [];
  name = 'Angular';
  constructor(private IDBService: IndexedDBService) {}
  ngOnInit(): void {
    this.IDBService.loadAllAnimals()
    .then(animals => {
      console.log('Loaded animals:', animals);
      this.animals = animals.map(animal => JSON.stringify(animal));
      // Process or display the animals as needed
    })
    .catch(error => {
      console.error('Failed to load animals:', error);
    });
  }


}

bootstrapApplication(App);
