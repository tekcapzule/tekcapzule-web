import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { EventChannelService, ChannelEvent, TopicApiService, UserApiService } from '@app/core';
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
export class CapsulesPageComponent implements OnInit, OnDestroy {
  searchInputValue = '';
  activeTab = 'myFeeds';
  topicsByCategory: TopicsByCategory[] = [];
  filteredTopicsByCategory: TopicsByCategory[] = [];
  userInfo: UserInfo = null;
  destroy$ = new Subject<boolean>();

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
    private userApiService: UserApiService
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();

    this.eventChannel
      .getChannel()
      .pipe(
        filter(out => out.event === ChannelEvent.SetActiveCapsuleTab),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.navigateToActiveCapsulePage(false);
      });

    this.topicApiService.getAllTopics().subscribe(topics => {
      this.setTopicsByCategory(topics);
    });

    this.navigateToActiveCapsulePage(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.authService.isUserLoggedIn()) {
      this.userApiService
        .getUser(this.authService.getUserInfo().attributes.email, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }

  navigateToActiveCapsulePage(refreshCache?: boolean): void {
    let activeNavTab: NavTab = this.navTabs[0];

    if (this.authService.isUserLoggedIn()) {
      this.navTabs[0].isHidden = false;
      activeNavTab = this.navTabs[0];
    } else {
      this.navTabs[0].isHidden = true;
      activeNavTab = this.navTabs[1];
    }

    this.activeTab = activeNavTab.uniqueId;
    this.router.navigate(['capsules', activeNavTab.navUrl]).then(() => {
      this.eventChannel.publish({
        event: ChannelEvent.LoadDataForActiveCapsuleTab,
        data: { refreshCache },
      });
    });
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

    this.filteredTopicsByCategory = this.topicsByCategory;
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
    jQuery('#browseByTopicModal').modal('hide');

    if (!this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    const userSubscribedTopics = [...(this.userInfo.subscribedTopics || []), topicCode];

    this.userApiService
      .followTopic(this.authService.getUserInfo().attributes.email, topicCode)
      .subscribe(() => {
        this.fetchUserInfo(true);
      });

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApiService.updateUserCache(this.userInfo);

    this.navigateToActiveCapsulePage(true);
  }

  unfollowTopic(topicCode: string): void {
    jQuery('#browseByTopicModal').modal('hide');

    if (!this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    const userSubscribedTopics = this.userInfo.subscribedTopics
      ? this.userInfo.subscribedTopics.filter(topic => topic !== topicCode)
      : [];

    this.userApiService
      .unfollowTopic(this.authService.getUserInfo().attributes.email, topicCode)
      .subscribe(() => {
        this.fetchUserInfo(true);
      });

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApiService.updateUserCache(this.userInfo);

    this.navigateToActiveCapsulePage(true);
  }

  searchInputChanged(value: string): void {
    if (value.length > 0) {
      const filteredTopics: TopicsByCategory[] = [];

      this.topicsByCategory.forEach(category => {
        const matchedTopics = category.topics.filter(
          topic => topic.name.toLowerCase().includes(value) || topic.aliases.includes(value)
        );

        if (matchedTopics.length > 0) {
          filteredTopics.push({ category: category.category, topics: matchedTopics });
        }
      });

      this.filteredTopicsByCategory = filteredTopics;
    } else {
      this.filteredTopicsByCategory = this.topicsByCategory;
    }
  }
}
