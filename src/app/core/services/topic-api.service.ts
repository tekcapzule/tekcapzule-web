import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Gateway FQDN needs to be taken from env file (will do this at the end).
// TODO: Fill in correct {{topic-gateway}}.
const TOPIC_API_GATEWAY_FQDN = 'https://{{topic-gateway}}.execute-api.us-east-2.amazonaws.com'.replace("{{topic-gateway}}", environment.topicGatewayLLD);
const TOPIC_API_PATH = `${TOPIC_API_GATEWAY_FQDN}/{{stage}}/topic`.replace("{{stage}}", environment.production ? "prod" : "dev");

@Injectable({
  providedIn: 'root',
})
export class TopicApiService {
  constructor(private httpClient: HttpClient) { }

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
