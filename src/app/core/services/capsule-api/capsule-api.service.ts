import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiSuccess, CapsuleItem } from '@app/shared/models';
import { cacheManager } from '@app/shared/utils';

const CAPSULE_API_PATH = `${environment.apiEndpointTemplate}/capsule`.replace(
  '{{gateway}}',
  environment.capsuleApiGateway
);

const CAPSULE_MYFEEDS_CACHE_KEY = 'com.tekcapsule.capsules.myfeeds';
const CAPSULE_TRENDING_CACHE_KEY = 'com.tekcapsule.capsules.trending';
const CAPSULE_EDITORSPICK_CACHE_KEY = 'com.tekcapsule.capsules.editorspick';
const CAPSULE_PENDING_APPROVAL_CACHE_KEY = 'com.tekcapsule.capsules.pending.approval';

@Injectable({
  providedIn: 'root',
})
export class CapsuleApiService {
  constructor(private httpClient: HttpClient) {}

  getCapsuleApiPath(): string {
    return CAPSULE_API_PATH;
  }

  getMyFeedCapsules(subscribedTopics: string[], refreshCache?: boolean): Observable<CapsuleItem[]> {
    return this.httpClient.post<CapsuleItem[]>(
      `${CAPSULE_API_PATH}/getMyFeed`,
      { subscribedTopics },
      {
        params: {
          cache: 'yes',
          expiry: '12',
          refresh: refreshCache ? 'yes' : 'no',
          ckey: CAPSULE_MYFEEDS_CACHE_KEY,
        },
      }
    );
  }

  getTrendingCapsules(refreshCache?: boolean): Observable<CapsuleItem[]> {
    return this.httpClient.post<CapsuleItem[]>(
      `${CAPSULE_API_PATH}/getTrending`,
      {},
      {
        params: {
          cache: 'yes',
          expiry: '12',
          refresh: refreshCache ? 'yes' : 'no',
          ckey: CAPSULE_TRENDING_CACHE_KEY,
        },
      }
    );
  }

  getEditorsPickCapsules(): Observable<CapsuleItem[]> {
    return this.httpClient.post<CapsuleItem[]>(
      `${CAPSULE_API_PATH}/getEditorsPick`,
      {},
      {
        params: {
          cache: 'yes',
          expiry: '24',
          ckey: CAPSULE_EDITORSPICK_CACHE_KEY,
        },
      }
    );
  }

  getPendingApproval(refreshCache?: boolean): Observable<CapsuleItem[]> {
    return this.httpClient.post<CapsuleItem[]>(
      `${CAPSULE_API_PATH}/getPendingApproval`,
      {},
      {
        params: {
          cache: 'yes',
          expiry: '24',
          refresh: refreshCache ? 'yes' : 'no',
          ckey: CAPSULE_PENDING_APPROVAL_CACHE_KEY,
        },
      }
    );
  }

  disableCapsule(capsuleId: string): Observable<CapsuleItem> {
    const pendingCapsuleCache = cacheManager.getItem(CAPSULE_PENDING_APPROVAL_CACHE_KEY);

    if (pendingCapsuleCache) {
      const pendingCapsules = (pendingCapsuleCache.body as CapsuleItem[]).filter(
        capsule => capsule.capsuleId !== capsuleId
      );

      cacheManager.setItem(CAPSULE_PENDING_APPROVAL_CACHE_KEY, {
        body: pendingCapsules,
        expiry: pendingCapsuleCache.expiry,
      });
    }

    return this.httpClient.post<CapsuleItem>(`${CAPSULE_API_PATH}/disable`, { capsuleId });
  }

  getCapsuleById(capsuleId: string): Observable<CapsuleItem> {
    return this.httpClient.post<CapsuleItem>(`${CAPSULE_API_PATH}/get`, { capsuleId });
  }

  updateCapsuleViewCount(capsuleId: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${CAPSULE_API_PATH}/view`, { capsuleId });
  }

  updateCapsuleRecommendCount(capsuleId: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${CAPSULE_API_PATH}/recommend`, { capsuleId });
  }

  updateCapsuleBookmarkCount(capsuleId: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${CAPSULE_API_PATH}/bookmark`, { capsuleId });
  }

  approveCapsule(capsuleId: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${CAPSULE_API_PATH}/approve`, { capsuleId });
  }
}
