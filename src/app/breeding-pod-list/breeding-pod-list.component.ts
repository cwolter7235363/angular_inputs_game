import { Component, OnInit } from '@angular/core';
import { BreedingPod } from '../../types';
import { BreedingServiceService } from '../breeding-service.service';
import { CommonModule } from '@angular/common';
import { RoundPipe } from '../round.pipe';
import { BreedingPodComponent } from "../breeding-pod/breeding-pod.component";


@Component({
    selector: 'app-breeding-pod-list',
    standalone: true,
    templateUrl: './breeding-pod-list.component.html',
    styleUrl: './breeding-pod-list.component.css',
    imports: [CommonModule, RoundPipe, BreedingPodComponent]
})
export class BreedingPodListComponent implements OnInit{
  public breedingPods: BreedingPod[] = [];


  constructor(protected breedService: BreedingServiceService) { }


  ngOnInit() {
    this.breedService.breedingPods$.subscribe(breedingPods => {
      this.breedingPods = breedingPods;
    });
  }

}
