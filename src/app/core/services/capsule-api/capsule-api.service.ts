import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiSuccess, CapsuleItem } from '@app/shared/models';
import { cacheManager } from '@app/shared/utils';
import { MetadataItem } from '@app/shared/models/capsule-item.model';

const CAPSULE_API_PATH = `${environment.apiEndpointTemplate}/capsule`
  .replace('{{api-gateway}}', environment.capsuleApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const CAPSULE_MYFEEDS_CACHE_KEY = 'com.tekcapsule.capsules.myfeeds';
const CAPSULE_TRENDING_CACHE_KEY = 'com.tekcapsule.capsules.trending';
const CAPSULE_EDITORSPICK_CACHE_KEY = 'com.tekcapsule.capsules.editorspick';
const CAPSULE_PENDING_APPROVAL_CACHE_KEY = 'com.tekcapsule.capsules.pending.approval';
const CAPSULE_METADATA_CACHE_KEY = 'com.tekcapsule.capsules.metadata';

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
          refresh: refreshCache ? 'yes' : 'no',
          ckey: CAPSULE_TRENDING_CACHE_KEY,
        },
      }
    );
  }

  getEditorsPickCapsules(refreshCache?: boolean): Observable<CapsuleItem[]> {
    return this.httpClient.post<CapsuleItem[]>(
      `${CAPSULE_API_PATH}/getEditorsPick`,
      {},
      {
        params: {
          cache: 'yes',
          refresh: refreshCache ? 'yes' : 'no',
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
    return this.httpClient
      .post<ApiSuccess>(`${CAPSULE_API_PATH}/view`, { capsuleId })
      .pipe(tap(() => this.updateViewCountInCache(capsuleId)));
  }

  updateCapsuleRecommendCount(capsuleId: string): Observable<ApiSuccess> {
    return this.httpClient
      .post<ApiSuccess>(`${CAPSULE_API_PATH}/recommend`, { capsuleId })
      .pipe(tap(() => this.updateRecommendationCountInCache(capsuleId)));
  }

  updateCapsuleBookmarkCount(capsuleId: string): Observable<ApiSuccess> {
    return this.httpClient
      .post<ApiSuccess>(`${CAPSULE_API_PATH}/bookmark`, { capsuleId })
      .pipe(tap(() => this.updateBookmarkCountInCache(capsuleId)));
  }

  approveCapsule(capsuleId: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${CAPSULE_API_PATH}/approve`, { capsuleId });
  }

  createCapsule(capsuleInfo: any): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${CAPSULE_API_PATH}/create`, capsuleInfo);
  }

  updateCapsule(capsuleInfo: CapsuleItem): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${CAPSULE_API_PATH}/update`, capsuleInfo);
  }

  getMetadata(refreshCache?: boolean): Observable<MetadataItem> {
    return this.httpClient.post<MetadataItem>(
      `${CAPSULE_API_PATH}/getMetadata`,
      {},
      {
        params: {
          cache: 'yes',
          refresh: refreshCache ? 'yes' : 'no',
          ckey: CAPSULE_METADATA_CACHE_KEY,
        },
      }
    );
  }

  updateViewCountInCache(capsuleId: string): void {
    [CAPSULE_MYFEEDS_CACHE_KEY, CAPSULE_TRENDING_CACHE_KEY, CAPSULE_EDITORSPICK_CACHE_KEY]
      .map(cacheKey => ({ cacheKey, cacheItem: cacheManager.getItem(cacheKey) }))
      .map(item => {
        if (item.cacheItem?.body) {
          (item.cacheItem.body as CapsuleItem[]).forEach(cap => {
            if (cap.capsuleId === capsuleId) {
              cap.views += 1;
            }
          });
        }
        return item;
      })
      .forEach(item => {
        cacheManager.setItem(item.cacheKey, {
          body: item.cacheItem.body,
          expiry: item.cacheItem.expiry,
        });
      });
  }

  updateRecommendationCountInCache(capsuleId: string): void {
    [CAPSULE_MYFEEDS_CACHE_KEY, CAPSULE_TRENDING_CACHE_KEY, CAPSULE_EDITORSPICK_CACHE_KEY]
      .map(cacheKey => ({ cacheKey, cacheItem: cacheManager.getItem(cacheKey) }))
      .map(item => {
        if (item.cacheItem?.body) {
          (item.cacheItem.body as CapsuleItem[]).forEach(cap => {
            if (cap.capsuleId === capsuleId) {
              cap.recommendations += 1;
            }
          });
        }
        return item;
      })
      .forEach(item => {
        cacheManager.setItem(item.cacheKey, {
          body: item.cacheItem.body,
          expiry: item.cacheItem.expiry,
        });
      });
  }

  updateBookmarkCountInCache(capsuleId: string): void {
    [CAPSULE_MYFEEDS_CACHE_KEY, CAPSULE_TRENDING_CACHE_KEY, CAPSULE_EDITORSPICK_CACHE_KEY]
      .map(cacheKey => ({ cacheKey, cacheItem: cacheManager.getItem(cacheKey) }))
      .map(item => {
        if (item.cacheItem?.body) {
          (item.cacheItem.body as CapsuleItem[]).forEach(cap => {
            if (cap.capsuleId === capsuleId) {
              cap.bookmarks += 1;
            }
          });
        }
        return item;
      })
      .forEach(item => {
        cacheManager.setItem(item.cacheKey, {
          body: item.cacheItem.body,
          expiry: item.cacheItem.expiry,
        });
      });
  }
}
