import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

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

  getMyFeedCapsules(subscribedTopics: string[]): Observable<any> {
    return this.httpClient.post(`${CAPSULE_API_PATH}/getMyFeed`, { subscribedTopics });
  }

  getTrendingCapsules(): Observable<any> {
    return this.httpClient.post(
      `${CAPSULE_API_PATH}/getTrending`,
      {},
      {
        params: { cache: 'true', expiry: '12' },
      }
    );
  }

  getEditorsPickCapsules(): Observable<any> {
    return this.httpClient.post(
      `${CAPSULE_API_PATH}/getEditorsPick`,
      {},
      {
        params: { cache: 'true', expiry: '24' },
      }
    );
  }

  updateCapsuleViewCount(capsuleId: string): Observable<any> {
    return this.httpClient.post(`${CAPSULE_API_PATH}/view`, { capsuleId });
  }

  updateCapsuleRecommendCount(capsuleId: string): Observable<any> {
    return this.httpClient.post(`${CAPSULE_API_PATH}/recommend`, { capsuleId });
  }
}
