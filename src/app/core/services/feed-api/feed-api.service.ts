import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiSuccess, IFeedItem } from '@app/shared/models';
import { cacheManager } from '@app/shared/utils';
import { MetadataItem } from '@app/shared/models/capsule-item.model';

const FEED_API_PATH = `${environment.apiEndpointTemplate}/feed`
  .replace('{{api-gateway}}', environment.feedApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const FEEDS_MYFEEDS_CACHE_KEY = 'com.tekcapzule.feeds.myfeeds';
const FEEDS_PENDING_APPROVAL_CACHE_KEY = 'com.tekcapzule.feeds.pending.approval';
const FEEDS_METADATA_CACHE_KEY = 'com.tekcapzule.feeds.metadata';

@Injectable({
  providedIn: 'root',
})
export class FeedApiService {
  constructor(private httpClient: HttpClient) {}

  getCapsuleApiPath(): string {
    return FEED_API_PATH;
  }

  getMyFeedCapsules(subscribedTopics: string[], refreshCache?: boolean): Observable<IFeedItem[]> {
    return this.httpClient.post<IFeedItem[]>(
      `${FEED_API_PATH}/getMyFeed`,
      { subscribedTopics },
      {
        params: {
          cache: 'yes',
          refresh: refreshCache ? 'yes' : 'no',
          ckey: FEEDS_MYFEEDS_CACHE_KEY,
        },
      }
    );
  }

  getPendingApproval(refreshCache?: boolean): Observable<IFeedItem[]> {
    return this.httpClient.post<IFeedItem[]>(
      `${FEED_API_PATH}/getPendingApproval`,
      {},
      {
        params: {
          cache: 'yes',
          refresh: refreshCache ? 'yes' : 'no',
          ckey: FEEDS_PENDING_APPROVAL_CACHE_KEY,
        },
      }
    );
  }

  disableCapsule(feedId: string): Observable<IFeedItem> {
    const pendingCapsuleCache = cacheManager.getItem(FEEDS_PENDING_APPROVAL_CACHE_KEY);

    if (pendingCapsuleCache) {
      const pendingCapsules = (pendingCapsuleCache.body as IFeedItem[]).filter(
        capsule => capsule.feedId !== feedId
      );

      cacheManager.setItem(FEEDS_PENDING_APPROVAL_CACHE_KEY, {
        body: pendingCapsules,
        expiry: pendingCapsuleCache.expiry,
      });
    }

    return this.httpClient.post<IFeedItem>(`${FEED_API_PATH}/disable`, { feedId });
  }

  getCapsuleById(feedId: string): Observable<IFeedItem> {
    return this.httpClient.post<IFeedItem>(`${FEED_API_PATH}/get`, { feedId });
  }

  updateFeedViewCount(feedId: string): Observable<ApiSuccess> {
    return this.httpClient
      .post<ApiSuccess>(`${FEED_API_PATH}/view`, { feedId })
      .pipe(tap(() => this.updateViewCountInCache(feedId)));
  }

  updateFeedRecommendCount(feedId: string): Observable<ApiSuccess> {
    return this.httpClient
      .post<ApiSuccess>(`${FEED_API_PATH}/recommend`, { feedId })
      .pipe(tap(() => this.updateRecommendationCountInCache(feedId)));
  }

  updateFeedBookmarkCount(feedId: string): Observable<ApiSuccess> {
    return this.httpClient
      .post<ApiSuccess>(`${FEED_API_PATH}/bookmark`, { feedId })
      .pipe(tap(() => this.updateBookmarkCountInCache(feedId)));
  }

  approveCapsule(feedId: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${FEED_API_PATH}/approve`, { feedId });
  }

  createCapsule(capsuleInfo: any): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${FEED_API_PATH}/create`, capsuleInfo);
  }

  updateCapsule(capsuleInfo: IFeedItem): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${FEED_API_PATH}/update`, capsuleInfo);
  }

  getMetadata(refreshCache?: boolean): Observable<MetadataItem> {
    return this.httpClient.post<MetadataItem>(
      `${FEED_API_PATH}/getMetadata`,
      {},
      {
        params: {
          cache: 'yes',
          refresh: refreshCache ? 'yes' : 'no',
          ckey: FEEDS_METADATA_CACHE_KEY,
        },
      }
    );
  }

  updateViewCountInCache(feedId: string): void {
    [FEEDS_MYFEEDS_CACHE_KEY]
      .map(cacheKey => ({ cacheKey, cacheItem: cacheManager.getItem(cacheKey) }))
      .map(item => {
        if (item.cacheItem?.body) {
          (item.cacheItem.body as IFeedItem[]).forEach(cap => {
            if (cap.feedId === feedId) {
              cap.views += 1;
            }
          });
        }
        return item;
      })
      .forEach(item => {
        if (item && item.cacheItem) {
          cacheManager.setItem(item.cacheKey, {
            body: item.cacheItem.body,
            expiry: item.cacheItem.expiry,
          });
        }
      });
  }

  updateRecommendationCountInCache(feedId: string): void {
    [FEEDS_MYFEEDS_CACHE_KEY]
      .map(cacheKey => ({ cacheKey, cacheItem: cacheManager.getItem(cacheKey) }))
      .map(item => {
        if (item.cacheItem?.body) {
          (item.cacheItem.body as IFeedItem[]).forEach(cap => {
            if (cap.feedId === feedId) {
              cap.recommendations += 1;
            }
          });
        }
        return item;
      })
      .forEach(item => {
        if (item && item.cacheItem) {
          cacheManager.setItem(item.cacheKey, {
            body: item.cacheItem.body,
            expiry: item.cacheItem.expiry,
          });
        }
      });
  }

  updateBookmarkCountInCache(feedId: string): void {
    [FEEDS_MYFEEDS_CACHE_KEY]
      .map(cacheKey => ({ cacheKey, cacheItem: cacheManager.getItem(cacheKey) }))
      .map(item => {
        if (item.cacheItem?.body) {
          (item.cacheItem.body as IFeedItem[]).forEach(cap => {
            if (cap.feedId === feedId) {
              cap.bookmarks += 1;
            }
          });
        }
        return item;
      })
      .forEach(item => {
        if (item && item.cacheItem) {
          cacheManager.setItem(item.cacheKey, {
            body: item.cacheItem.body,
            expiry: item.cacheItem.expiry,
          });
        }
      });
  }
}
