import { TestBed } from '@angular/core/testing';

import { AppSpinnerService } from './app-spinner.service';

describe('AppSpinnerService', () => {
  let service: AppSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
