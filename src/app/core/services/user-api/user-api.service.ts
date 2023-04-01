import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { cacheManager, Constants } from '@app/shared/utils';
import { ApiSuccess, TekUserInfo } from '@app/shared/models';

const USER_API_PATH = `${environment.apiEndpointTemplate}/user`
  .replace('{{api-gateway}}', environment.userApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const USER_INFO_CACHE_KEY = 'com.tekcapsule.user.info';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  getUserApiPath(): string {
    return USER_API_PATH;
  }

  getTekUserInfo(userId: string, refreshCache?: boolean): Observable<TekUserInfo> {
    return this.httpClient.post<TekUserInfo>(
      `${USER_API_PATH}/get`,
      { userId },
      {
        params: {
          cache: 'yes',
          refresh: refreshCache ? 'yes' : 'no',
          ckey: USER_INFO_CACHE_KEY,
        },
      }
    );
  }

  createTekUserInfo(user: TekUserInfo): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${USER_API_PATH}/create`, user);
  }

  bookmarCapsule(userId: string, capsuleId: string): Observable<any> {
    const userInfo = this.getTekUserInfoCache();
    if (userInfo && userInfo.bookmarks) {
      userInfo.bookmarks.push(capsuleId);
      this.updateTekUserInfoCache(userInfo);
    }

    return this.httpClient.post(`${USER_API_PATH}/bookmark`, { userId, capsuleId });
  }

  removeCapsuleBookmark(userId: string, capsuleId: string): Observable<any> {
    const userInfo = this.getTekUserInfoCache();
    if (userInfo && userInfo.bookmarks) {
      userInfo.bookmarks = userInfo.bookmarks.filter(bm => bm !== capsuleId);
      this.updateTekUserInfoCache(userInfo);
    }

    return this.httpClient.post(`${USER_API_PATH}/removeBookmark`, { userId, capsuleId });
  }

  followTopic(userId: string, topicCodes: string[]): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${USER_API_PATH}/follow`, { userId, topicCodes });
  }

  unfollowTopic(userId: string, topicCode: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${USER_API_PATH}/unfollow`, { userId, topicCode });
  }

  getTekUserInfoCache(): TekUserInfo | null {
    const cache = cacheManager.getItem(USER_INFO_CACHE_KEY);
    return cache ? (cache.body as TekUserInfo) : null;
  }

  updateTekUserInfoCache(userInfo: TekUserInfo): void {
    const currentCache = cacheManager.getItem(USER_INFO_CACHE_KEY);

    if(currentCache) {
      cacheManager.setItem(USER_INFO_CACHE_KEY, {
        body: userInfo,
        expiry: currentCache.expiry,
      });
    }
  }

  isTekUserInfoCacheExists(): boolean {
    return cacheManager.getItem(USER_INFO_CACHE_KEY) ? true : false;
  }

  deleteTekUserInfoCache(): void {
    cacheManager.removeItem(USER_INFO_CACHE_KEY);
  }
}
