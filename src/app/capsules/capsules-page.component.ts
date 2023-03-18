import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

import {
  EventChannelService,
  ChannelEvent,
  TopicApiService,
  UserApiService,
  AuthService,
  CapsuleApiService,
  AppSpinnerService,
} from '@app/core';
import { NavTab, TopicItem, UserInfo } from '@app/shared/models';
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
    { uniqueId: 'myFeeds', navUrl: 'myfeeds', displayName: 'For You' },
    { uniqueId: 'trending', navUrl: 'trending', displayName: 'Trending' },
    { uniqueId: 'editorsPick', navUrl: 'editorspick', displayName: 'Editors Pick' },
  ];

  constructor(
    private router: Router,
    private eventChannel: EventChannelService,
    private auth: AuthService,
    private topicApi: TopicApiService,
    private userApi: UserApiService,
    private capsuleApi: CapsuleApiService,
    private spinner: AppSpinnerService
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

    this.topicApi.getAllTopics().subscribe(topics => {
      this.setTopicsByCategory(topics);
    });

    if (this.router.url !== '/capsules/create') {
      this.navigateToActiveCapsulePage(false);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.auth.isUserLoggedIn()) {
      this.userApi
        .getUser(this.auth.getUserInfo().username, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }

  navigateToActiveCapsulePage(refreshCache?: boolean): void {
    // if (this.auth.isUserLoggedIn()) {
    //   this.navTabs[0].isHidden = false;
    //   activeNavTab = this.navTabs[0];
    // } else {
    //   this.navTabs[0].isHidden = true;
    //   activeNavTab = this.navTabs[1];
    // }

    const activeNavTab = this.navTabs[0];
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
    if (this.auth.isUserLoggedIn()) {
      return this.userInfo?.subscribedTopics?.includes(topicCode);
    }

    return false;
  }

  followTopic(topicCode: string): void {
    jQuery('#browseByTopicModal').modal('hide');

    if (!this.auth.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    const userSubscribedTopics = [...(this.userInfo.subscribedTopics || []), topicCode];

    this.userApi.followTopic(this.auth.getUserInfo().username, topicCode).subscribe(() => {
      this.fetchUserInfo(true);
    });

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApi.updateUserCache(this.userInfo);

    this.navigateToActiveCapsulePage(true);
  }

  unfollowTopic(topicCode: string): void {
    jQuery('#browseByTopicModal').modal('hide');

    if (!this.auth.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    const userSubscribedTopics = this.userInfo.subscribedTopics
      ? this.userInfo.subscribedTopics.filter(topic => topic !== topicCode)
      : [];

    this.userApi.unfollowTopic(this.auth.getUserInfo().username, topicCode).subscribe(() => {
      this.fetchUserInfo(true);
    });

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApi.updateUserCache(this.userInfo);

    this.navigateToActiveCapsulePage(true);
  }

  searchInputChanged(value: string): void {
    if (value.length > 0) {
      const filteredTopics: TopicsByCategory[] = [];

      this.topicsByCategory.forEach(category => {
        const matchedTopics = category.topics.filter(topic =>
          topic.title.toLowerCase().includes(value.toLowerCase())
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

  onHardRefreshCapsules(): void {
    this.spinner.show();

    forkJoin([
      this.capsuleApi.getTrendingCapsules(true),
      this.capsuleApi.getEditorsPickCapsules(true),
    ]).subscribe(() => {
      this.spinner.hide();

      this.eventChannel.publish({
        event: ChannelEvent.LoadDataForActiveCapsuleTab,
        data: { refreshCache: true },
      });
    });
  }
}
