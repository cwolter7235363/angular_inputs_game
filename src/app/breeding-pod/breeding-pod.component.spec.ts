import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedingPodComponent } from './breeding-pod.component';

describe('BreedingPodComponent', () => {
  let component: BreedingPodComponent;
  let fixture: ComponentFixture<BreedingPodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedingPodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreedingPodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
