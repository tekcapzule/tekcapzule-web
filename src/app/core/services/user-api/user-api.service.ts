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

  getUser(): Observable<any> {
    const userId =  "linjith.kunnon@gmail.com";  // TODO :: Get user id 
    return this.httpClient.post(`${USER_API_PATH}/get`, {userId},{
      params: { cache: 'true', expiry: '12' },
    });
  }

  setUserBookmarks(capsuleId: string): Observable<any> {
    const userId =  "linjith.kunnon@gmail.com";  // TODO :: Get user id 
    return this.httpClient.post(`${USER_API_PATH}/bookmark`, {capsuleId, userId});
  }

  removeUserBookmarks(capsuleId: string): Observable<any> {
    const userId =  "linjith.kunnon@gmail.com";  // TODO :: Get user id 
    return this.httpClient.post(`${USER_API_PATH}/removeBookmark`, {capsuleId, userId});
  }

  createUser(): void {
    throw new Error('Not yet implemented.');
  }
}
