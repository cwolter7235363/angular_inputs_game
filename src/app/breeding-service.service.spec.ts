import { TestBed } from '@angular/core/testing';

import { BreedingServiceService } from './breeding-service.service';

describe('BreedingServiceService', () => {
  let service: BreedingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreedingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
