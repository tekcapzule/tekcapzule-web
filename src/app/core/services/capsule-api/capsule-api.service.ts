import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiSuccess, CapsuleItem } from '@app/shared/models';
import { cacheManager, Constants } from '@app/shared/utils';
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

  createCapsule(capsuleInfo: any): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${CAPSULE_API_PATH}/create`, capsuleInfo);
  }

  updateCapsule(capsuleInfo: CapsuleItem): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${CAPSULE_API_PATH}/update`, capsuleInfo);
  }

  getMetadata(refreshCache?: boolean): Observable<MetadataItem> {
    return this.httpClient.post<MetadataItem>(`${CAPSULE_API_PATH}/getMetadata`, {},
    {
      params: {
        cache: 'yes',
        refresh: refreshCache ? 'yes' : 'no',
        ckey: CAPSULE_METADATA_CACHE_KEY,
      },
    });
  }
}
