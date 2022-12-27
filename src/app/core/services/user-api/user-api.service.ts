import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { cacheManager, Constants } from '@app/shared/utils';
import { ApiSuccess, UserInfo } from '@app/shared/models';

const USER_API_PATH = `${environment.apiEndpointTemplate}/user`
  .replace('{{api-gateway}}', environment.userApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const USER_INFO_CACHE_KEY = 'com.tekcapsule.user.info';
const API_CACHE_EXPIRY_HOURS =
  environment.apiCacheExpiryHours || Constants.DefaultApiCacheExpiryHours;

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
          expiry: API_CACHE_EXPIRY_HOURS,
          refresh: refreshCache ? 'yes' : 'no',
          ckey: USER_INFO_CACHE_KEY,
        },
      }
    );
  }

  createUser(user: UserInfo): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${USER_API_PATH}/create`, user);
  }

  bookmarCapsule(userId: string, capsuleId: string): Observable<any> {
    const userInfo = this.getUserCache();
    if (userInfo && userInfo.bookmarks) {
      userInfo.bookmarks.push(capsuleId);
      this.updateUserCache(userInfo);
    }
    return this.httpClient.post(`${USER_API_PATH}/bookmark`, { userId, capsuleId });
  }

  removeCapsuleBookmark(userId: string, capsuleId: string): Observable<any> {
    const userInfo = this.getUserCache();
    if (userInfo && userInfo.bookmarks) {
      userInfo.bookmarks = userInfo.bookmarks.filter(bm => bm !== capsuleId);
      this.updateUserCache(userInfo);
    }
    return this.httpClient.post(`${USER_API_PATH}/removeBookmark`, { userId, capsuleId });
  }

  followTopic(userId: string, topicCode: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${USER_API_PATH}/follow`, { userId, topicCode });
  }

  unfollowTopic(userId: string, topicCode: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${USER_API_PATH}/unfollow`, { userId, topicCode });
  }

  getUserCache(): UserInfo | null {
    const cache = cacheManager.getItem(USER_INFO_CACHE_KEY);
    return cache ? (cache.body as UserInfo) : null;
  }

  updateUserCache(userInfo: UserInfo): void {
    const current = new Date();
    current.setHours(current.getHours() + 12);
    cacheManager.setItem(USER_INFO_CACHE_KEY, {
      body: userInfo,
      expiry: current.getTime(),
    });
  }

  isUserCacheExists(): boolean {
    return cacheManager.getItem(USER_INFO_CACHE_KEY) ? true : false;
  }

  deleteUserCache(): void {
    cacheManager.removeItem(USER_INFO_CACHE_KEY);
  }
}
