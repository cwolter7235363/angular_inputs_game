import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IndexedDBService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animalsSubject = new BehaviorSubject<any[]>([]);
  public animals$ = this.animalsSubject.asObservable();

  constructor(private indexedDBService: IndexedDBService) {
    this.loadInitialData();
  }

  private async loadInitialData() {
    try {
      const animals = await this.indexedDBService.loadAllAnimals();
      this.animalsSubject.next(animals);
    } catch (error) {
      console.error('Failed to load animals from IndexedDB:', error);
    }
  }

  addAnimal(animal: any) {
    this.indexedDBService.addAnimal(animal).then(() => {
      this.loadInitialData(); // Reload the animals list to include the new animal
    }).catch(error => {
      console.error('Failed to add animal:', error);
    });
  }

  getAnimal(uuid: string) {
    return this.indexedDBService.getAnimal(uuid);
  }

  deleteAnimal(uuid: string) {
    this.indexedDBService.deleteAnimal(uuid).then(() => {
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