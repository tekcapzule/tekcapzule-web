import { TestBed } from '@angular/core/testing';

import { SkillStudioApiService } from './skill-studio-api.service';

describe('SkillStudioApiService', () => {
  let service: SkillStudioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillStudioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
