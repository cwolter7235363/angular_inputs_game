import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { BreedingPod } from '../types'; // Assuming BreedingPod is correctly defined in your types
import { combineInputsAndAddNew } from './helpers/combineMonsters';
import { randSuperheroName } from '@ngneat/falso';
import { AnimalService } from './animal-service.service';

@Injectable({
  providedIn: 'root'
})
export class BreedingServiceService {
  private breedingPodsSubject = new BehaviorSubject<BreedingPod[]>([]);
  public breedingPods$ = this.breedingPodsSubject.asObservable();
  private _animalService: AnimalService | undefined;

  constructor(private injector: Injector) {
    this.loadPodsFromLocalStorage(); // Load initial pods on service initialization
    this.updateTimeToHatch(); // Start the timer to update time to hatch
  }

  private get animalService(): AnimalService {
    if (!this._animalService) {
      this._animalService = this.injector.get(AnimalService);
    }
    return this._animalService;
  }


  savePodsToLocalStorage() {
    const currentPods = this.breedingPodsSubject.getValue(); // Get the current value of the BehaviorSubject
    localStorage.setItem('breedingPods', JSON.stringify(currentPods)); // Save it to localStorage
  }

  loadPodsFromLocalStorage() {
    const podsString = localStorage.getItem('breedingPods');
    if (podsString) {
      let pods: BreedingPod[] = JSON.parse(podsString);
      // Convert breedingStartDateTime from string to Date object
      pods = pods.map(pod => ({
        ...pod,
        breedingStartDateTime: new Date(pod.breedingStartDateTime)
      }));
      this.breedingPodsSubject.next(pods); // Update the BehaviorSubject with the loaded pods
    }
  }
  createOffspringForPod(pod: BreedingPod) {
    // Create the offspring object
    // @ts-ignore
    const a = combineInputsAndAddNew(pod.parents[0], pod.parents[1]) as any[]; // Assuming combineInputsAndAddNew is a function that combines two monsters into a new one


    const offspring = {
      uuid: uuidv4(),
      ...a,
      species: pod.parents[0].species,
      name: randSuperheroName()
      // Include other required properties with default values as necessary
    } as any; // Consider defining a proper type instead of using 'any'
  
    // Update the passed pod's offspring array directly
    const updatedPod = { ...pod, offspring: [...pod.offspring, offspring] };
  
    // Update the BehaviorSubject with the modified pod
    return updatedPod
  }

  updateTimeToHatch() {
    if (this.breedingPodsSubject.getValue().length === 0) {
      return; // No pods to update
    }
    setInterval(() => {
      const currentPods = this.breedingPodsSubject.getValue();
      const now = new Date(); // Get the current time
      const updatedPods = currentPods.map(pod => {

        if (pod?.countDown != undefined && pod?.countDown <= 0) {

          if (pod.offspring.length === 0) {
            return this.createOffspringForPod(pod);
          }
          
          
          return pod;
        }
        // Convert breedingStartDateTime from string back to Date object if necessary
        const breedingStart = new Date(pod.breedingStartDateTime);
        // Assuming timeToHatch is initially in seconds, convert it to milliseconds
        const hatchDate = new Date(breedingStart.getTime() + pod.timeToHatch * 1000);
        // Calculate the remaining time in seconds
        let remainingTime = (hatchDate.getTime() - now.getTime()) / 1000;
        remainingTime = Math.max(remainingTime, 0); // Ensure remaining time doesn't go below 0
        return { ...pod, countDown: remainingTime };
      });
      this.breedingPodsSubject.next(updatedPods);
      this.savePodsToLocalStorage(); // Optionally save the updated pods to localStorage
    }, 1000); // Update every 10 seconds
  }

  public breakBreedingPod(podId: string) {
    const currentPods = this.breedingPodsSubject.getValue();
    // Filter out the pod with the matching podId
    const updatedPods = currentPods.filter(pod => pod.uuid !== podId);
    this.breedingPodsSubject.next(updatedPods);
    this.savePodsToLocalStorage();
  }

  public claimOffspring(podId: string) {
    const currentPods = this.breedingPodsSubject.getValue();
    // Find the pod with the matching podId and grab the Offspring and put it into the AnimalService
    const offspring = currentPods.find(pod => pod.uuid === podId)?.offspring
    if (offspring) {
      let newBorn = offspring[0];
      this.animalService.addAnimal(newBorn);
    }
    this.breakBreedingPod(podId);
    this.savePodsToLocalStorage();
  }

  // Method to add a monster to a breeding pod
  submitBreedingPair(monster1: any, monster2: any, podId?: string) {
    const currentPods = this.breedingPodsSubject.getValue();
    if (podId) {
      // If podId is provided, add both monsters to the existing pod
      const updatedPods = currentPods.map(pod => 
        pod.uuid === podId ? { ...pod, monsters: [...pod.parents, monster1, monster2] } : pod
      );
      this.breedingPodsSubject.next(updatedPods);
    } else {
      // If no podId is provided, create a new pod with these two monsters
      const newPod: BreedingPod = {
        uuid: uuidv4(), // Generate a unique ID for the new pod
        parents: [monster1, monster2],
        offspring: [],
        errorMessage: '',
        timeToHatch: monster1.gestationPeriod.value + monster2.gestationPeriod.value * 24, 
        breedingStartDateTime: new Date(),
        countDown: Infinity
      };
      this.breedingPodsSubject.next([...currentPods, newPod]);
      this.savePodsToLocalStorage();
    }
  }
} 