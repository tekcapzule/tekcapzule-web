import { TestBed } from '@angular/core/testing';

import { CourseApiService } from './course-api.service';

describe('CourseApiService', () => {
  let service: CourseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
