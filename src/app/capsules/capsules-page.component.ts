import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import {
  EventChannelService,
  ChannelEvent,
  TopicApiService,
  UserApiService,
  CapsuleApiService,
} from '@app/core';
import { NavTab, TopicItem, UserInfo } from '@app/shared/models';
import { AuthService } from '@app/auth';
import { Constants } from '@app/shared/utils';

declare const jQuery: any;

interface TopicsByCategory {
  category: string;
  topics: TopicItem[];
}

@Component({
  selector: 'app-capsules-page',
  templateUrl: './capsules-page.component.html',
  styleUrls: ['./capsules-page.component.scss'],
})
export class CapsulesPageComponent implements OnInit {
  activeTab = 'myFeeds';
  topicsByCategory: TopicsByCategory[] = [];
  userInfo: UserInfo = null;

  navTabs: NavTab[] = [
    { uniqueId: 'myFeeds', navUrl: 'myfeeds', displayName: 'My Feeds', isHidden: true },
    { uniqueId: 'trending', navUrl: 'trending', displayName: 'Trending' },
    { uniqueId: 'editorsPick', navUrl: 'editorspick', displayName: 'Editors Pick' },
  ];

  constructor(
    private router: Router,
    private eventChannel: EventChannelService,
    private authService: AuthService,
    private topicApiService: TopicApiService,
    private userApiService: UserApiService,
    private capsuleApiService: CapsuleApiService
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();

    this.eventChannel
      .getChannel()
      .pipe(filter(out => out.event === ChannelEvent.SetActiveTab))
      .subscribe(() => {
        this.navigateToActiveCapsulePage();
      });

    this.topicApiService.getAllTopics().subscribe(topics => {
      this.setTopicsByCategory(topics);
    });

    this.navigateToActiveCapsulePage();
  }

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.authService.isUserLoggedIn()) {
      this.userApiService
        .getUser(this.authService.getUserInfo().attributes.email, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }

  navigateToActiveCapsulePage(): void {
    let activeNavTab: NavTab = this.navTabs[0];

    if (this.authService.isUserLoggedIn()) {
      this.navTabs[0].isHidden = false;
      activeNavTab = this.navTabs[0];
    } else {
      this.navTabs[0].isHidden = true;
      activeNavTab = this.navTabs[1];
    }

    this.activeTab = activeNavTab.uniqueId;
    this.router.navigate(['capsules', activeNavTab.navUrl]);
  }

  setTopicsByCategory(topics: any[]): void {
    const categoryMap = {};
    const miscTopics = [];

    if (topics && topics.length > 0) {
      topics.forEach(topic => {
        if (topic.category) {
          categoryMap[topic.category] = categoryMap[topic.category] || [];
          categoryMap[topic.category].push(topic);
        } else {
          miscTopics.push(topic);
        }
      });
    }

    for (const category of Object.keys(categoryMap)) {
      this.topicsByCategory.push({
        category,
        topics: categoryMap[category],
      });
    }

    if (miscTopics.length > 0) {
      this.topicsByCategory.push({
        category: 'Miscellaneous',
        topics: miscTopics,
      });
    }
  }

  setActiveTab(navTab: NavTab): void {
    this.activeTab = navTab.uniqueId;
  }

  isActiveTab(navTab: NavTab): boolean {
    return this.activeTab === navTab.uniqueId;
  }

  deActivateTabs(): void {
    this.activeTab = Constants.None;
  }

  canHideNavTabs(): boolean {
    return this.activeTab === Constants.None;
  }

  isTopicSubscribed(topicCode: string): boolean {
    if (this.authService.isUserLoggedIn()) {
      return this.userInfo?.subscribedTopics?.includes(topicCode);
    }

    return false;
  }

  followTopic(topicCode: string): void {
    if (!this.authService.isUserLoggedIn()) {
      jQuery('#browseByTopicModal').modal('hide');
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    const userSubscribedTopics = [...this.userInfo.subscribedTopics, topicCode];

    this.userApiService
      .followTopic(this.authService.getUserInfo().attributes.email, topicCode)
      .pipe(
        tap(() => {
          this.capsuleApiService.getMyFeedCapsules(userSubscribedTopics, true);
        })
      )
      .subscribe(() => {
        this.fetchUserInfo(true);
      });

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApiService.updateUserCache(this.userInfo);

    this.navigateToActiveCapsulePage();
  }

  unfollowTopic(topicCode: string): void {
    if (!this.authService.isUserLoggedIn()) {
      jQuery('#browseByTopicModal').modal('hide');
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    const userSubscribedTopics = this.userInfo.subscribedTopics.filter(
      topic => topic !== topicCode
    );

    this.userApiService
      .unfollowTopic(this.authService.getUserInfo().attributes.email, topicCode)
      .pipe(
        tap(() => {
          this.capsuleApiService.getMyFeedCapsules(userSubscribedTopics, true);
        })
      )
      .subscribe(() => {
        this.fetchUserInfo(true);
      });

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApiService.updateUserCache(this.userInfo);

    this.navigateToActiveCapsulePage();
  }
}
