import { Injectable, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimalService } from './animal-service.service';

@Injectable({
  providedIn: 'root'
})
export class MaturingService {
  private static intervalSet = false; // Static variable to track interval setup
  private _animalService: AnimalService | undefined;
  private animalSubscription: Subscription | undefined;

  private get animalService(): AnimalService {
    if (!this._animalService) {
      this._animalService = this.injector.get(AnimalService);
    }
    return this._animalService;
  }

  constructor(private injector: Injector) {
    if (!MaturingService.intervalSet) {
      this.setupMaturingProcess();
      MaturingService.intervalSet = true;
    }
  }

  private setupMaturingProcess() {
    this.animalSubscription = this.animalService.animals$.subscribe(animals => {
      if (animals.length === 0) return;

      // Assuming you want to periodically check the maturing status of animals
      setInterval(() => {
        // Here, you would loop over the animals and update their maturing status
        animals.forEach(animal => {
          // Example: Check if the animal is ready to mature and update it accordingly
          // This is a placeholder logic; you'll need to implement the actual maturing logic based on your application's needs
        });

        // After updating animals, you might want to save changes or emit an updated list
        // This is a placeholder for such logic
      }, 1000 * 60); // Update every minute, adjust as needed
    });
  }

  ngOnDestroy() {
    // Clean up the subscription when the service is destroyed
    if (this.animalSubscription) {
      this.animalSubscription.unsubscribe();
    }
  }
}