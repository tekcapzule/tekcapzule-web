import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSuccess } from '@app/shared';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const SUBSCRIPTION_API_PATH = `${environment.apiEndpointTemplate}/subscription`.replace(
  '{{gateway}}',
  environment.subscriptionApiGateway
);

@Injectable({
  providedIn: 'root',
})
export class SubscriptionApiService {
  constructor(private httpClient: HttpClient) {}

  getSubscriptionApiPath(): string {
    return SUBSCRIPTION_API_PATH;
  }

  subscribe(emailId: string): Observable<ApiSuccess> {
    return this.httpClient.post<ApiSuccess>(`${SUBSCRIPTION_API_PATH}/subscribe`, { emailId });
  }
}
