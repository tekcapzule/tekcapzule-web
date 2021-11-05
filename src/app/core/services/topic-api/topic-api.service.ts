import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

const TOPIC_API_PATH = `${environment.apiEndpointTemplate}/topic`
  .replace('{{gateway}}', environment.topicApiGateway)
  .replace('{{stage}}', environment.apiStageEnv);

@Injectable({
  providedIn: 'root',
})
export class TopicApiService {
  constructor(private httpClient: HttpClient) {}

  getTopicApiPath(): string {
    return TOPIC_API_PATH;
  }

  getAllTopics(): Observable<any> {
    return this.httpClient.post(`${TOPIC_API_PATH}/getAll`, {});
  }

  createTopic(topic: any): Observable<any> {
    return this.httpClient.post(`${TOPIC_API_PATH}/create`, topic);
  }

  disableTopic(code: any): Observable<any> {
    return this.httpClient.post(`${TOPIC_API_PATH}/disable`, code);
  }

  getTopic(code: any): Observable<any> {
    return this.httpClient.post(`${TOPIC_API_PATH}/get`, code);
  }

  updateTopic(topic: any): Observable<any> {
    return this.httpClient.post(`${TOPIC_API_PATH}/update`, topic);
  }
}
