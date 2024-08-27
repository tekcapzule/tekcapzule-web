import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '@env/environment';
import { cacheManager, isNullOrUndefined } from '@app/shared/utils';
import { ApiSuccess, TekUserInfo } from '@app/shared/models';
import { AuthStateService } from '../app-state/auth-state.service';
import { AwsUserInfo } from '../auth/auth.service';
import { IBookmarkItem } from '@app/shared/models/user-info.model';

const USER_API_PATH = `${environment.apiEndpointTemplate}/user`
  .replace('{{api-gateway}}', environment.userApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const USER_INFO_CACHE_KEY = 'com.tekcapzule.user.info';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  userInfo: TekUserInfo;

  constructor(private httpClient: HttpClient, private auth: AuthStateService) {}

  getUserApiPath(): string {
    return USER_API_PATH;
  }

  setUserInfo(userInfo: TekUserInfo) {
    this.userInfo = userInfo;
  }

  getUserInfo(): TekUserInfo {
    return this.userInfo;
  }

  getTekUserInfo(refreshCache?: boolean): Observable<TekUserInfo> {
    const userId = this.auth.getAwsUserInfo().email;

    return this.httpClient
      .post<TekUserInfo>(
        `${USER_API_PATH}/get`,
        { userId },
        {
          params: {
            cache: 'yes',
            refresh: refreshCache ? 'yes' : 'no',
            ckey: USER_INFO_CACHE_KEY,
          },
        }
      )
      .pipe(
        tap((userInfo: TekUserInfo) => {
          if (isNullOrUndefined(userInfo.bookmarks)) {
            userInfo.bookmarks = [];
          }
          if (isNullOrUndefined(userInfo.subscribedTopics)) {
            userInfo.subscribedTopics = [];
          }
        })
      );
  }

  createTekUserInfo(user: TekUserInfo): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${USER_API_PATH}/create`, user);
  }

  bookmarFeed(userId: string, bookmark: IBookmarkItem): Observable<any> {
    const userInfo = this.getTekUserInfoCache();
    if (userInfo && userInfo.bookmarks) {
      userInfo.bookmarks.push(bookmark);
      this.updateTekUserInfoCache(userInfo);
    }

    return this.httpClient.post(`${USER_API_PATH}/bookmark`, { userId, bookmark });
  }

  removeFeedBookmark(userId: string, bookmark: IBookmarkItem): Observable<any> {
    const userInfo = this.getTekUserInfoCache();
    if (userInfo && userInfo.bookmarks) {
      userInfo.bookmarks = userInfo.bookmarks.filter(bm => bm.resourceId !== bookmark.resourceId);
      this.updateTekUserInfoCache(userInfo);
    }

    return this.httpClient.post(`${USER_API_PATH}/removeBookmark`, { userId, bookmark });
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

    if (currentCache) {
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
