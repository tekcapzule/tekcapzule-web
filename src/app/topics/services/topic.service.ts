import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserApiService, AuthService } from '@app/core';
import { UserInfo } from '@app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  userInfo: UserInfo = null;

  constructor(private router: Router, private auth: AuthService, private userApi: UserApiService) {
    this.userInfo = this.userApi.getUserCache();
  }

  fetchUserInfo(refreshCache?: boolean): void {
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
      this.fetchUserInfo(true);
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

    this.userApi
      .unfollowTopic(this.auth.getUserInfo().username, topicCode)
      .subscribe(() => {
        this.fetchUserInfo(true);
      });
  }
}
