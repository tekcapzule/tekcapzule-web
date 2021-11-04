import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserApiService } from './user-api.service';

describe('UserApiService', () => {
  let service: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct user api path', () => {
    expect(service.getUserApiPath()).toBe(
      'https://rki9lzz4gl.execute-api.us-east-2.amazonaws.com/dev/user'
    );
  });
});
