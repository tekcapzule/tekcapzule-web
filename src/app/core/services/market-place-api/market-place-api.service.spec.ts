import { TestBed } from '@angular/core/testing';

import { MarketPlaceApiService } from './market-place-api.service';

describe('MarketPlaceApiService', () => {
  let service: MarketPlaceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketPlaceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
