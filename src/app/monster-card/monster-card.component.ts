import { Component, Input } from '@angular/core';
import { Animal } from '../../types';
import { MonsterSelectionService } from '../service/monster-selection-service/monster-selection-service.service';

@Component({
  selector: 'app-monster-card',
  standalone: true,
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class MonsterCardComponent {
  @Input() monster: Animal | undefined = undefined;

  constructor(protected selectionService: MonsterSelectionService) {}

  onMonsterClick(): void {
    if (this.monster) {
      this.selectionService.toggleSelection(this.monster);
      console.log('Monster clicked:', this.monster);
      // Additional logic can be added here if needed
    }
  }
}