import { TestBed } from '@angular/core/testing';

import { MaturingService } from './maturing.service';

describe('MaturingService', () => {
  let service: MaturingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaturingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
