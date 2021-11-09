import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';

const FEEDBACK_API_PATH = `${environment.apiEndpointTemplate}/feedback`.replace(
  '{{gateway}}',
  environment.feedbackApiGateway
);

@Injectable({
  providedIn: 'root',
})
export class FeedbackApiService {
  constructor(private httpClient: HttpClient) {}

  getFeedbackApiPath(): string {
    return FEEDBACK_API_PATH;
  }
}
