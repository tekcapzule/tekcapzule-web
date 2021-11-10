import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

const CAPSULE_API_PATH = `${environment.apiEndpointTemplate}/capsule`.replace(
  '{{gateway}}',
  environment.capsuleApiGateway
);

export interface MyFeedRequest {
  subscribedTopics: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CapsuleApiService {
  constructor(private httpClient: HttpClient) { }

  getCapsuleApiPath(): string {
    return CAPSULE_API_PATH;
  }

  getMyFeedCapsules(myFeedRequest: MyFeedRequest): Observable<any> {
    return this.httpClient.post(`${CAPSULE_API_PATH}/getMyFeed`, { ...myFeedRequest, cache: true });
  }

  getTrendingCapsules(): Observable<any> {
    return this.httpClient.post(`${CAPSULE_API_PATH}/getTrending`, { cache: true });
  }

  getEditorsPickCapsules(): Observable<any> {
    return this.httpClient.post(`${CAPSULE_API_PATH}/getEditorsPick`, { cache: true });
  }

  registerCapsuleClick(capsuleId: string): void {
    this.httpClient.post(`${CAPSULE_API_PATH}/view`, { capsuleId }).subscribe();
  }

}
