import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { BreedingServiceService } from './breeding-service.service';
import { IndexedDBService } from './indexed-db.service';
import { MonsterSelectionService } from './service/monster-selection-service/monster-selection-service.service';
import { BreedingPod, EvolutionStage } from '../types';
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
    this.setupMaturingProcess();
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

  private setupMaturingProcess() {
    setInterval(() => {
      const updatedAnimals = this.animalsSubject.getValue().map(monster => {
        if (monster.evolutionStage === EvolutionStage.adult) {
          return monster;
        }
        if (!monster.lastEvolutionTimestamp) {
          monster.lastEvolutionTimestamp = new Date(monster.birthTimestamp);
        }
        const cycleTimeMilis = monster.species.cycleTime * 24 * 60 * 60 * 1000; // Corrected to milliseconds
        const lastEvolutionTime = monster.lastEvolutionTimestamp instanceof Date ? monster.lastEvolutionTimestamp.getTime() : new Date(monster.lastEvolutionTimestamp).getTime();
        const timeSinceLastEvolution = Date.now() - lastEvolutionTime;
        const progressPercentage = Math.min((timeSinceLastEvolution / cycleTimeMilis) * 100, 100);
  
        if (timeSinceLastEvolution >= cycleTimeMilis) {
          monster.lastEvolutionTimestamp = new Date(); // Update to current Date
          monster.evolutionStage = (monster.evolutionStage + 1) % Object.keys(EvolutionStage).length / 2; // Ensure cycling through stages correctly
          monster.progressTowardsNextEvolution = 0;
        } else {
          monster.progressTowardsNextEvolution = progressPercentage;
        }
  
        return monster;
      });
  
      this.animalsSubject.next(updatedAnimals);
      updatedAnimals.forEach(monster => this.updateAnimal(monster));
    }, 3000); // Execute every 3000ms (3 seconds)
  }





  addAnimal(animal: any) {
    this.indexedDBService.addAnimal(animal).then(() => {
      this.loadInitialData(); // Reload the animals list to include the new animal
      this.initializeFilteredAnimals(); // Reload the filtered animals list to exclude the selece animals
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