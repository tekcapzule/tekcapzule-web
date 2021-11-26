import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { TopicItem } from '@app/shared/models';
import { cacheManager } from '@app/shared/utils';

const TOPIC_API_PATH = `${environment.apiEndpointTemplate}/topic`.replace(
  '{{gateway}}',
  environment.topicApiGateway
);

const TOPICS_ALLTOPICS_CACHE_KEY = 'com.tekcapsule.topics.alltopics';

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
          ckey: TOPICS_ALLTOPICS_CACHE_KEY,
        },
      }
    );
  }

  createTopic(topic: any): Observable<any> {
    const allTopicCache = cacheManager.getItem(TOPICS_ALLTOPICS_CACHE_KEY);
    if (allTopicCache) {
      const allTopics = allTopicCache.body as TopicItem[];
      allTopics.push(topic);
      cacheManager.setItem(TOPICS_ALLTOPICS_CACHE_KEY, {
        body: allTopics,
        expiry: allTopicCache.expiry,
      });
    }

    return this.httpClient.post(`${TOPIC_API_PATH}/create`, topic);
  }

  disableTopic(code: string): Observable<any> {
    const allTopicCache = cacheManager.getItem(TOPICS_ALLTOPICS_CACHE_KEY);

    if (allTopicCache) {
      const allTopics = allTopicCache.body as TopicItem[];
      allTopics.find(topic => topic.code === code).status = 'INACTIVE';
      cacheManager.setItem(TOPICS_ALLTOPICS_CACHE_KEY, {
        body: allTopics,
        expiry: allTopicCache.expiry,
      });
    }
    return this.httpClient.post(`${TOPIC_API_PATH}/disable`, { code });
  }

  getTopic(code: any): Observable<TopicItem> {
    return this.httpClient.post<TopicItem>(`${TOPIC_API_PATH}/get`, code);
  }

  updateTopic(topic: any): Observable<any> {
    const allTopicCache = cacheManager.getItem(TOPICS_ALLTOPICS_CACHE_KEY);
    if (allTopicCache) {
      let allTopics = allTopicCache.body as TopicItem[];
      allTopics = allTopics.filter(t => t.code !== topic.code);
      allTopics.push(topic);
      cacheManager.setItem(TOPICS_ALLTOPICS_CACHE_KEY, {
        body: allTopics,
        expiry: allTopicCache.expiry,
      });
    }
    return this.httpClient.post(`${TOPIC_API_PATH}/update`, topic);
  }
}
