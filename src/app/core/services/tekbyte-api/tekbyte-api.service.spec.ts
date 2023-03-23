import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TekByteApiService } from './tekbyte-api.service';

describe('TekByteApiService', () => {
  let service: TekByteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TekByteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
