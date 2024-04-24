import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Animal } from '../../../types';

@Injectable({
  providedIn: 'root',
})
export class MonsterSelectionService {
  private selectedMonsters: Animal[] = [];
  // Initialize the BehaviorSubject with the initial state of selectedMonsters
  private selectedMonstersSubject = new BehaviorSubject<Animal[]>(this.selectedMonsters);

  constructor() { }

  selectMonster(monster: Animal): void {
    if (!this.selectedMonsters.includes(monster)) {
      this.selectedMonsters.push(monster);
      if (this.selectedMonsters.length > 2) {
        this.selectedMonsters.shift(); // Keeps the array to a maximum of 2 elements
      }
      // Update the BehaviorSubject with the new state
      this.selectedMonstersSubject.next(this.selectedMonsters);
    }
  }

  deselectMonster(monster: Animal): void {
    this.selectedMonsters = this.selectedMonsters.filter(m => m !== monster);
    // Update the BehaviorSubject with the new state
    this.selectedMonstersSubject.next(this.selectedMonsters);
  }

  toggleSelection(monster: Animal): void {
    if (this.selectedMonsters.includes(monster)) {
      this.deselectMonster(monster);
    } else {
      this.selectMonster(monster);
    }
    // Update the BehaviorSubject with the new state
    this.selectedMonstersSubject.next(this.selectedMonsters);
  }

  // Provide an observable for components to subscribe to
  getSelectedMonstersObservable() {
    return this.selectedMonstersSubject.asObservable();
  }

  isSelected(monster?: Animal): boolean {
    if (!monster) return false;
    return this.selectedMonsters.includes(monster);
  }
}