import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionStepperComponent } from './evolution-stepper.component';

describe('EvolutionStepperComponent', () => {
  let component: EvolutionStepperComponent;
  let fixture: ComponentFixture<EvolutionStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvolutionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
