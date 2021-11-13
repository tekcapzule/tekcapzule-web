import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

const USER_API_PATH = `${environment.apiEndpointTemplate}/user`.replace(
  '{{gateway}}',
  environment.userApiGateway
);

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  getUserApiPath(): string {
    return USER_API_PATH;
  }

  getUser(userId: string, refreshCache?: boolean): Observable<any> {
    // TODO: Overriding now for dev purpose. Remove it later once user flow is completed.
    userId = 'linjith.kunnon@gmail.com';
    return this.httpClient.post(
      `${USER_API_PATH}/get`,
      { userId },
      {
        params: {
          cache: 'yes',
          expiry: '12',
          refresh: refreshCache ? 'yes' : 'no',
        },
      }
    );
  }

  setUserBookmarks(userId: string, capsuleId: string): Observable<any> {
    // TODO: Overriding now for dev purpose. Remove it later once user flow is completed.
    userId = 'linjith.kunnon@gmail.com';
    return this.httpClient.post(`${USER_API_PATH}/bookmark`, { capsuleId, userId });
  }

  removeUserBookmarks(userId: string, capsuleId: string): Observable<any> {
    // TODO: Overriding now for dev purpose. Remove it later once user flow is completed.
    userId = 'linjith.kunnon@gmail.com';
    return this.httpClient.post(`${USER_API_PATH}/removeBookmark`, { capsuleId, userId });
  }

  createUser(): void {
    throw new Error('Not yet implemented.');
  }
}
