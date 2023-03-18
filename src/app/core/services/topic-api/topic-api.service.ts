import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { TopicItem, UserInfo } from '@app/shared/models';
import { cacheManager, Constants } from '@app/shared/utils';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UserApiService } from '@app/core/services/user-api/user-api.service';

const TOPIC_API_PATH = `${environment.apiEndpointTemplate}/topic`
  .replace('{{api-gateway}}', environment.topicApiGateway)
  .replace('{{aws-region}}', environment.awsRegion);

const TOPICS_ALLTOPICS_CACHE_KEY = 'com.tekcapsule.topics.alltopics';
const TOPICS_GETTOPIC_CACHE_KEY = 'com.tekcapsule.topics.gettopic.<code>';

@Injectable({
  providedIn: 'root',
})
export class TopicApiService {
  userInfo: UserInfo = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private auth: AuthService,
    private userApi: UserApiService
  ) {
    this.userInfo = this.userApi.getUserCache();
  }

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

  getTopic(code: string): Observable<TopicItem> {
    return this.httpClient.post<TopicItem>(`${TOPIC_API_PATH}/get`, code, {
      params: {
        cache: 'yes',
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
        .getUser(this.auth.getUserInfo().username, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }

  isFollowingTopic(topicCode: string): boolean {
    if (this.auth.isUserLoggedIn()) {
      return this?.userInfo?.subscribedTopics
        ? this.userInfo.subscribedTopics.includes(topicCode)
        : false;
    }

    return false;
  }

  followTopic(topicCode: string): void {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    const userSubscribedTopics = [...(this.userInfo.subscribedTopics || []), topicCode];

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApi.updateUserCache(this.userInfo);

    this.userApi.followTopic(this.auth.getUserInfo().username, topicCode).subscribe(() => {
      this.updateUserInfo(true);
    });
  }

  unfollowTopic(topicCode: string): void {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    const userSubscribedTopics = this.userInfo.subscribedTopics
      ? this.userInfo.subscribedTopics.filter(topic => topic !== topicCode)
      : [];

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApi.updateUserCache(this.userInfo);

    this.userApi.unfollowTopic(this.auth.getUserInfo().username, topicCode).subscribe(() => {
      this.updateUserInfo(true);
    });
  }
}
