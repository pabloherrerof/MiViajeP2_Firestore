import { TestBed } from '@angular/core/testing';

import { DayFilterService } from './day-filter.service';

describe('DayFilterService', () => {
  let service: DayFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
