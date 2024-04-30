import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../types';
import { EvolutionStage } from '../AttributeConfig';
@Component({
  selector: 'app-evolution-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evolution-stepper.component.html',
  styleUrl: './evolution-stepper.component.css'
})
export class EvolutionStepperComponent {
  @Input() monster!: Animal; 
EvolutionStage: typeof EvolutionStage = EvolutionStage;


  // derive current stage of evolution from monster data
  get currentStage() {
    return EvolutionStage[this.monster.evolutionStage as unknown as keyof typeof EvolutionStage]
  }

  get progress() {
    // Example calculation, adjust based on your actual data and requirements
    // const progressTowardsNextStage = this.monster.progress; // Assuming this is a value between 0 and 1
    return 10 * 100;
  }
}
