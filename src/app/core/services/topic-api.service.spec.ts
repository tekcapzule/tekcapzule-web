import { TestBed } from '@angular/core/testing';

import { TopicApiService } from './topic-api.service';

describe('TopicApiService', () => {
  let service: TopicApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
