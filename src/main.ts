import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { AnimalFormComponent } from "./app/animal-form/animal-form.component";
import { AttributeInputComponent } from "./app/attribute-input/attribute-input.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-animal-form/>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
    imports: [AnimalFormComponent, AttributeInputComponent]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
