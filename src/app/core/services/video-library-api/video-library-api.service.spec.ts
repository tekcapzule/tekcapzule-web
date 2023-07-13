import { TestBed } from '@angular/core/testing';

import { VideoLibraryApiService } from './video-library-api.service';

describe('VideoLibraryApiService', () => {
  let service: VideoLibraryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoLibraryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
