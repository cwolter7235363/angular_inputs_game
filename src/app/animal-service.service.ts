import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IndexedDBService } from './indexed-db.service';
import { MonsterSelectionService } from './service/monster-selection-service/monster-selection-service.service';
import { BreedingPod } from '../types';
import { BreedingServiceService } from './breeding-service.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animalsSubject = new BehaviorSubject<any[]>([]);
  public animals$ = this.animalsSubject.asObservable();
  private filteredAnimalsSubject = new BehaviorSubject<any[]>([]);
  public filteredAnimals$ = this.filteredAnimalsSubject.asObservable();
  private breedingAnimalsSubject = new BehaviorSubject<BreedingPod[]>([]);
  public breedingAnimals$ = this.breedingAnimalsSubject.asObservable();


  constructor(private indexedDBService: IndexedDBService, private selectionService: MonsterSelectionService, private breedingService: BreedingServiceService) {
    this.loadInitialData();
    this.initializeFilteredAnimals();
  }

  private async loadInitialData() {
    try {
      const animals = await this.indexedDBService.loadAllAnimals();
      this.animalsSubject.next(animals);
    } catch (error) {
      console.error('Failed to load animals from IndexedDB:', error);
    }
  }

  private initializeFilteredAnimals() {
    combineLatest([this.animals$, this.selectionService.getSelectedMonstersObservable(), this.breedingService.breedingPods$])
      .subscribe(([animals, selectedMonsters, breedingPods]) => {
        const breedingMonsters = breedingPods.flatMap(pod => pod.parents); // Flatten all monsters in pods
        // Ensure we have a list of UUIDs for selected monsters for a more reliable comparison
        const selectedMonsterUUIDs = selectedMonsters.map(monster => monster.uuid);
        // Filter out selected and breeding animals
        const filtered = animals.filter(animal => 
          !selectedMonsterUUIDs.includes(animal.uuid) && // Check against UUIDs for selected monsters
          !breedingMonsters.find(m => m.uuid === animal.uuid)); // Exclude breeding animals
        this.filteredAnimalsSubject.next(filtered);
      });
  }


  addAnimal(animal: any) {
    debugger
    this.indexedDBService.addAnimal(animal).then(() => {
      this.loadInitialData(); // Reload the animals list to include the new animal
      this.initializeFilteredAnimals(); // Reload the filtered animals list to exclude the new animal
    }).catch(error => {
      console.error('Failed to add animal:', error);
    });
  }

  getAnimal(uuid: string) {
    return this.indexedDBService.getAnimal(uuid);
  }

  deleteAnimal(uuid: string) {
    this.indexedDBService.deleteAnimal(uuid).then(() => {
      // remove the animal from the selection service
      this.selectionService.deselectMonster(this.selectionService.getSelectedMonsters().find(animal => animal.uuid === uuid));
      // remove the animal from the list of animals and or the filtered animals
      this.selectionService.getSelectedMonsters().find(animal => animal.uuid === uuid) ? this.loadInitialData() : this.filteredAnimalsSubject.next(this.filteredAnimalsSubject.getValue().filter(animal => animal.uuid !== uuid));
      
      this.loadInitialData(); // Reload the animals list to reflect the deletion
    }).catch(error => {
      console.error('Failed to delete animal:', error);
    });
  }

  updateAnimal(animal: any) {
    this.indexedDBService.updateRecord(animal).then(() => {
      this.loadInitialData(); // Reload the animals list to reflect the update
    }).catch(error => {
      console.error('Failed to update animal:', error);
    });
  }
}