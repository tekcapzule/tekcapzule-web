import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const FEEDBACK_API_PATH = `${environment.apiEndpointTemplate}/feedback`
  .replace('{{api-gateway}}', environment.feedbackApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

@Injectable({
  providedIn: 'root',
})
export class FeedbackApiService {
  constructor(private httpClient: HttpClient) {}

  getFeedbackApiPath(): string {
    return FEEDBACK_API_PATH;
  }

  createFeedback(feedback: any): Observable<any> {
    return this.httpClient.post(`${FEEDBACK_API_PATH}/create`, feedback);
  }
}
