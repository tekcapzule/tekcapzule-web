import { TestBed } from '@angular/core/testing';

import { FeedbackApiService } from './feedback-api.service';

describe('FeedbackApiService', () => {
  let service: FeedbackApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
