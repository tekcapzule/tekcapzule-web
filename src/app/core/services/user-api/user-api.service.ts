import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  
  exchangeToken(): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('X-Frame-Options', 'ALLOW');
    return this.httpClient.post<any>('https://tekcapsuledev.auth.us-east-1.amazoncognito.com/oauth2/token', { grant_type: 'authorization_code', 
      client_id: '7amnm03r23p36h7ne5soen1387', code: '3438cf49-d7d7-4f0a-9d01-4f8a3f1a4136', 'redirect_uri':'https://dev.tekcapsule.com/', client_secret: 'gulpli9ibralfmdjk2itbc1jtmhrlm9k2r5s244u9t8dtm6a6l2' },
      {headers:headers});
  }

}
