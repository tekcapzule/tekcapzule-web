import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CapsuleItem } from '@app/shared/models';

const CAPSULE_API_PATH = `${environment.apiEndpointTemplate}/capsule`.replace(
  '{{gateway}}',
  environment.capsuleApiGateway
);

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
        },
      }
    );
  }

  getTrendingCapsules(): Observable<CapsuleItem[]> {
    return this.httpClient.post<CapsuleItem[]>(
      `${CAPSULE_API_PATH}/getTrending`,
      {},
      {
        params: {
          cache: 'yes',
          expiry: '12',
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
        },
      }
    );
  }

  getCapsuleById(capsuleId: string): Observable<CapsuleItem> {
    return this.httpClient.post<CapsuleItem>(`${CAPSULE_API_PATH}/get`, { capsuleId });
  }

  updateCapsuleViewCount(capsuleId: string): Observable<any> {
    return this.httpClient.post(`${CAPSULE_API_PATH}/view`, { capsuleId });
  }

  updateCapsuleRecommendCount(capsuleId: string): Observable<any> {
    return this.httpClient.post(`${CAPSULE_API_PATH}/recommend`, { capsuleId });
  }

  updateCapsuleBookmarkCount(capsuleId: string): Observable<any> {
    return this.httpClient.post(`${CAPSULE_API_PATH}/bookmark`, { capsuleId });
  }
}
