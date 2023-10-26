import { TestBed } from '@angular/core/testing';

import { DaysFirestoreService } from './days-firestore.service';

describe('DaysFirestoreService', () => {
  let service: DaysFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
