import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InsightsApiService } from './insights-api.service';

describe('InsightsApiService', () => {
  let service: InsightsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(InsightsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
