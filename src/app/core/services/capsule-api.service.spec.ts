import { TestBed } from '@angular/core/testing';

import { CapsuleApiService } from './capsule-api.service';

describe('CapsuleApiService', () => {
  let service: CapsuleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapsuleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
