import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedingPodListComponent } from './breeding-pod-list.component';

describe('BreedingPodListComponent', () => {
  let component: BreedingPodListComponent;
  let fixture: ComponentFixture<BreedingPodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedingPodListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreedingPodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
