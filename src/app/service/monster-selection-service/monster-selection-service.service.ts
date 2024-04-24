import { Injectable } from '@angular/core';
import { Animal } from '../../../types';

@Injectable({
  providedIn: 'root',
})
export class MonsterSelectionService {
  private selectedMonsters: Animal[] = [];

  constructor() { }

  selectMonster(monster: Animal): void {
    if (!this.selectedMonsters.includes(monster)) {
      // Add the new monster
      this.selectedMonsters.push(monster);
      // If adding the new monster exceeds the limit, remove the oldest one
      if (this.selectedMonsters.length > 2) {
        this.selectedMonsters.shift(); // Removes the first element from the array
      }
    }
  }

  deselectMonster(monster: Animal): void {
    this.selectedMonsters = this.selectedMonsters.filter(m => m !== monster);
  }

  toggleSelection(monster: Animal): void {
    if (this.selectedMonsters.includes(monster)) {
      this.deselectMonster(monster);
    } else {
      this.selectMonster(monster);
    }
  }

  getSelectedMonsters(): Animal[] {
    return this.selectedMonsters;
  }

  isSelected(monster?: Animal): boolean {
    if (!monster) 
      return false;
    
    return this.selectedMonsters.includes(monster);
  }
}