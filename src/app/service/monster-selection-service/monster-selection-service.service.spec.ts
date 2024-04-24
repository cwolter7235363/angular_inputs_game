import { TestBed } from '@angular/core/testing';

import { MonsterSelectionServiceService } from './monster-selection-service.service';

describe('MonsterSelectionServiceService', () => {
  let service: MonsterSelectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterSelectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
