import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { TopicItem } from '@app/shared/models';

const TOPIC_API_PATH = `${environment.apiEndpointTemplate}/topic`.replace(
  '{{gateway}}',
  environment.topicApiGateway
);

@Injectable({
  providedIn: 'root',
})
export class TopicApiService {
  constructor(private httpClient: HttpClient) {}

  getTopicApiPath(): string {
    return TOPIC_API_PATH;
  }

  getAllTopics(): Observable<TopicItem[]> {
    return this.httpClient.post<TopicItem[]>(
      `${TOPIC_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          expiry: '24',
        },
      }
    );
  }

  createTopic(topic: any): Observable<any> {
    return this.httpClient.post(`${TOPIC_API_PATH}/create`, topic);
  }

  disableTopic(code: any): Observable<any> {
    return this.httpClient.post(`${TOPIC_API_PATH}/disable`, code);
  }

  getTopic(code: any): Observable<TopicItem> {
    return this.httpClient.post<TopicItem>(`${TOPIC_API_PATH}/get`, code);
  }

  updateTopic(topic: any): Observable<any> {
    return this.httpClient.post(`${TOPIC_API_PATH}/update`, topic);
  }
}
