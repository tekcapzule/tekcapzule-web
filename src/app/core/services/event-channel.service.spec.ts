import { TestBed } from '@angular/core/testing';

import { EventChannelService } from './event-channel.service';

describe('EventChannelService', () => {
  let service: EventChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
