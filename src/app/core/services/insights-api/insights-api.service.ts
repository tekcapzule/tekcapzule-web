import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { InsightsItem } from '@app/shared/models/insights-item.model';
import { environment } from '@env/environment';

const INSIGHTS_API_PATH = `${environment.apiEndpointTemplate}/insight`
  .replace('{{api-gateway}}', environment.insightsApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const INSIGHTS_ALL_INSIGHTS_CACHE_KEY = 'com.tekcapzule.insights.allinsights';
const INSIGHTS_GET_INSIGHTS_CACHE_KEY = 'com.tekcapzule.insights.getinsights.<code>';

@Injectable({
  providedIn: 'root',
})
export class InsightsApiService {
  // userInfo: UserInfo = null;

  constructor(
    private httpClient: HttpClient
  ) {
    // this.userInfo = this.userApi.getUserCache();
  }

  getTekByteApiPath(): string {
    return INSIGHTS_API_PATH;
  }

  getAllInsights(): Observable<InsightsItem[]> {
    return this.httpClient.post<InsightsItem[]>(
      `${INSIGHTS_API_PATH}/getAllNews`,
      {
        "startsFrom": "2023-08-08",
        "topic":"AI"
    },
      {
        params: {
          cache: 'yes',
          ckey: INSIGHTS_ALL_INSIGHTS_CACHE_KEY,
        },
      }
    );
  }

}
