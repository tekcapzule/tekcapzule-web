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
import { NavTab, TopicItem, TekUserInfo } from '@app/shared/models';
import { Constants } from '@app/shared/utils';

declare const jQuery: any;

export interface BrowseByTopic {
  topic: TopicItem;
  isSubscribed: boolean;
}

@Component({
  selector: 'app-capsules-page',
  templateUrl: './capsules-page.component.html',
  styleUrls: ['./capsules-page.component.scss'],
})
export class CapsulesPageComponent implements OnInit, OnDestroy {
  searchInputValue = '';
  activeTab = 'myFeeds';
  userInfo: TekUserInfo = null;
  destroy$ = new Subject<boolean>();
  browseByTopics: BrowseByTopic[] = [];
  filteredBrowseByTopics: BrowseByTopic[] = [];

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
      this.setBrowseByTopics(topics);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.auth.isUserLoggedIn()) {
      this.userApi
        .getTekUserInfo(this.auth.getAwsUserInfo().username, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }

  navigateToActiveCapsulePage(refreshCache?: boolean): void {
    const activeNavTab = this.navTabs[0];
    this.activeTab = activeNavTab.uniqueId;

    this.router.navigate(['capsules', activeNavTab.navUrl]).then(() => {
      this.eventChannel.publish({
        event: ChannelEvent.LoadDataForActiveCapsuleTab,
        data: { refreshCache },
      });
    });
  }

  setBrowseByTopics(topics: TopicItem[]): void {
    if (topics && topics.length > 0) {
      const filteredTopics = topics
        .filter(topic => topic.title !== '' && topic.code !== '')
        .map<BrowseByTopic>(topic => ({ topic, isSubscribed: false }));

      this.browseByTopics = filteredTopics;
      this.filteredBrowseByTopics = filteredTopics;
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
    if (this.auth.isUserLoggedIn()) {
      return this.userInfo?.subscribedTopics?.includes(topicCode);
    }

    return false;
  }

  followTopic(topicCode: string): void {
    jQuery('#browseByTopicModal').modal('hide');

    // if (!this.auth.isUserLoggedIn()) {
    //   this.router.navigateByUrl('/auth/signin');
    //   return;
    // }

    const userSubscribedTopics = [...(this.userInfo.subscribedTopics || []), topicCode];

    this.userApi.followTopic(this.auth.getAwsUserInfo().username, topicCode).subscribe(() => {
      this.fetchUserInfo(true);
    });

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApi.updateTekUserInfoCache(this.userInfo);
    this.navigateToActiveCapsulePage(true);
  }

  unfollowTopic(topicCode: string): void {
    jQuery('#browseByTopicModal').modal('hide');

    // if (!this.auth.isUserLoggedIn()) {
    //   this.router.navigateByUrl('/auth/signin');
    //   return;
    // }

    const userSubscribedTopics = this.userInfo.subscribedTopics
      ? this.userInfo.subscribedTopics.filter(topic => topic !== topicCode)
      : [];

    this.userApi.unfollowTopic(this.auth.getAwsUserInfo().username, topicCode).subscribe(() => {
      this.fetchUserInfo(true);
    });

    this.userInfo = {
      ...this.userInfo,
      subscribedTopics: userSubscribedTopics,
    };

    this.userApi.updateTekUserInfoCache(this.userInfo);
    this.navigateToActiveCapsulePage(true);
  }

  searchInputChanged(value: string): void {
    if (value.length > 0) {
      this.filteredBrowseByTopics = this.browseByTopics.filter(item => {
        return item.topic.title.toLowerCase().includes(value.toLowerCase());
      });
    } else {
      this.filteredBrowseByTopics = this.browseByTopics;
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
