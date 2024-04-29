import { Component, Input } from '@angular/core';
import { Animal } from '../../types';
import { MonsterSelectionService } from '../service/monster-selection-service/monster-selection-service.service';
import { Gender } from '../animal-form/animal-form.component';
import { IndexedDBService } from '../indexed-db.service';
import { AnimalService } from '../animal-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monster-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class MonsterCardComponent {
  @Input() monster: Animal | undefined = undefined;

  constructor(protected selectionService: MonsterSelectionService, private IDBService: IndexedDBService, protected AnimalService: AnimalService) {}

  onMonsterClick(): void {
    if (this.monster) {
      this.selectionService.toggleSelection(this.monster);
      console.log('Monster clicked:', this.monster);
      // Additional logic can be added here if needed
    }
  }

  releaseMonster(event: MouseEvent): void {
    event.stopPropagation(); // Prevent click event from bubbling up to the parent div
    if (this.monster && confirm(`Are you sure you want to release ${this.monster.name}?`)) {
      this.selectionService.deselectMonster(this.monster);
      this.AnimalService.deleteAnimal(this.monster.uuid)
    }
}

  get stringifiedMonster(): string {
    return JSON.stringify(this.monster, null, 2);
  }

  getGenderString(gender?: Gender): string {
    if (gender === undefined) return ""
    return Gender[gender]; // This converts the enum value to its string representation
  }
}