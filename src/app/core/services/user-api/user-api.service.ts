import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { sessionCacheManager } from '@app/shared/utils';
import { ApiSuccess, UserInfo } from '@app/shared/models';

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

  getUser(userId: string, refreshCache?: boolean): Observable<UserInfo> {
    return this.httpClient.post<UserInfo>(
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

  bookmarCapsule(userId: string, capsuleId: string): Observable<any> {
    return this.httpClient.post(`${USER_API_PATH}/bookmark`, { userId, capsuleId });
  }

  removeCapsuleBookmark(userId: string, capsuleId: string): Observable<any> {
    return this.httpClient.post(`${USER_API_PATH}/removeBookmark`, { userId, capsuleId });
  }

  followTopic(userId: string, topicCode: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${USER_API_PATH}/follow`, { userId, topicCode });
  }

  unfollowTopic(userId: string, topicCode: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${USER_API_PATH}/unfollow`, { userId, topicCode });
  }

  createUser(): void {
    throw new Error('Not yet implemented.');
  }

  getUserCache(): UserInfo | null {
    const userCacheKey = `${USER_API_PATH}/get`;
    const cache = sessionCacheManager.getItem(userCacheKey);
    return cache ? (cache.body as UserInfo) : null;
  }

  updateUserCache(userInfo: UserInfo): void {
    const userCacheKey = `${USER_API_PATH}/get`;
    const current = new Date();
    current.setHours(current.getHours() + 12);
    sessionCacheManager.setItem(userCacheKey, {
      body: userInfo,
      expiry: current.getTime(),
    });
  }
}
