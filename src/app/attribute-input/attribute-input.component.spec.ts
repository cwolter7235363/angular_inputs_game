import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeInputComponent } from './attribute-input.component';

describe('AttributeInputComponent', () => {
  let component: AttributeInputComponent;
  let fixture: ComponentFixture<AttributeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttributeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
