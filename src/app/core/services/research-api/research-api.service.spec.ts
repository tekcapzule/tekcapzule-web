import { TestBed } from '@angular/core/testing';

import { ResearchApiService } from './research-api.service';

describe('ResearchApiService', () => {
  let service: ResearchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResearchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
