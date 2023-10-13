import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { TopicItem, TekUserInfo } from '@app/shared/models';
import { cacheManager, Constants } from '@app/shared/utils';
import { AuthStateService, UserApiService } from '@app/core';

const TOPIC_API_PATH = `${environment.apiEndpointTemplate}/topic`
  .replace('{{api-gateway}}', environment.topicApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const TOPICS_ALLTOPICS_CACHE_KEY = 'com.tekcapsule.topics.alltopics';
const TOPICS_GETTOPIC_CACHE_KEY = 'com.tekcapsule.topics.gettopic.<code>';

@Injectable({
  providedIn: 'root',
})
export class TopicApiService {
  userInfo: TekUserInfo = null;

  constructor(
    private httpClient: HttpClient,
    private auth: AuthStateService,
    private userApi: UserApiService
  ) {
    this.userInfo = this.userApi.getTekUserInfoCache();
  }

  getTopicApiPath(): string {
    return TOPIC_API_PATH;
  }

  getAllTopics(refreshCache: boolean = false): Observable<TopicItem[]> {
    return this.httpClient.post<TopicItem[]>(
      `${TOPIC_API_PATH}/getAll`,
      {},
      {
        params: {
          cache: 'yes',
          refresh: refreshCache ? 'yes' : 'no',
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

  getTopic(code: string, refreshCache?: boolean): Observable<TopicItem> {
    return this.httpClient.post<TopicItem>(`${TOPIC_API_PATH}/get`, code, {
      params: {
        cache: 'yes',
        refresh: refreshCache ? 'yes' : 'no',
        ckey: TOPICS_GETTOPIC_CACHE_KEY.replace('<code>', code),
      },
    });
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

  updateUserInfo(refreshCache?: boolean): void {
    if (this.auth.isUserLoggedIn()) {
      this.userApi
        .getTekUserInfo(refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }
}
