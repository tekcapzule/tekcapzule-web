import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TopicApiService } from './topic-api.service';

fdescribe('TopicApiService', () => {
  let service: TopicApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TopicApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct topic api path', () => {
    expect(service.getTopicApiPath()).toBe(
      'https://odl3njp8ya.execute-api.us-east-2.amazonaws.com/dev/topic'
    );
  });
});
