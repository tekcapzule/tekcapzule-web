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

const DEFAULT_SUBSCRIPTION_TOPICS = ['AI', 'CLD', 'SWD'];

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
        this.navigateToActiveCapsulePage(null, false);
      });

    this.topicApi.getAllTopics().subscribe(topics => {
      this.setBrowseByTopics(topics);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  hideBroweByTopicModal(): void {
    jQuery('#browseByTopicModal').modal('hide');
  }

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.auth.isUserLoggedIn()) {
      this.userApi
        .getTekUserInfo(this.auth.getAwsUserInfo().username, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }

  navigateToActiveCapsulePage(topics: string[], refreshCache?: boolean): void {
    const activeNavTab = this.navTabs[0];
    this.activeTab = activeNavTab.uniqueId;

    this.router.navigate(['capsules', activeNavTab.navUrl]).then(() => {
      this.eventChannel.publish({
        event: ChannelEvent.LoadDataForActiveCapsuleTab,
        data: { topics, refreshCache },
      });
    });
  }

  setBrowseByTopics(topics: TopicItem[]): void {
    if (topics && topics.length > 0) {
      const filteredTopics = topics
        .filter(topic => topic.title !== '' && topic.code !== '')
        .map<BrowseByTopic>(topic => {
          const isSubscribed = this.isTopicSubscribed(topic.code);
          return { topic, isSubscribed };
        });

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

  /**
   * If user is logged in, user subscribed topics are selected.
   * If there are no user subscribed topics, data for default topcis are loaded in my feeds page.
   * If user is not logged in, default topics are selected.
   */
  isTopicSubscribed(topicCode: string): boolean {
    if (this.auth.isUserLoggedIn()) {
      return this.userInfo?.subscribedTopics?.length > 0
        ? this.userInfo.subscribedTopics.includes(topicCode)
        : false;
    } else {
      return Constants.DefaultSubscriptionTopics.includes(topicCode);
    }
  }

  toggleSubscribeTopic(item: BrowseByTopic): void {
    item.isSubscribed = !item.isSubscribed;
  }

  // followTopic(topicCode: string): void {
  //   jQuery('#browseByTopicModal').modal('hide');

  //   // if (!this.auth.isUserLoggedIn()) {
  //   //   this.router.navigateByUrl('/auth/signin');
  //   //   return;
  //   // }

  //   const userSubscribedTopics = [...(this.userInfo.subscribedTopics || []), topicCode];

  //   this.userApi.followTopic(this.auth.getAwsUserInfo().username, topicCode).subscribe(() => {
  //     this.fetchUserInfo(true);
  //   });

  //   this.userInfo = {
  //     ...this.userInfo,
  //     subscribedTopics: userSubscribedTopics,
  //   };

  //   this.userApi.updateTekUserInfoCache(this.userInfo);
  //   this.navigateToActiveCapsulePage(true);
  // }

  // unfollowTopic(topicCode: string): void {
  //   jQuery('#browseByTopicModal').modal('hide');

  //   // if (!this.auth.isUserLoggedIn()) {
  //   //   this.router.navigateByUrl('/auth/signin');
  //   //   return;
  //   // }

  //   const userSubscribedTopics = this.userInfo.subscribedTopics
  //     ? this.userInfo.subscribedTopics.filter(topic => topic !== topicCode)
  //     : [];

  //   this.userApi.unfollowTopic(this.auth.getAwsUserInfo().username, topicCode).subscribe(() => {
  //     this.fetchUserInfo(true);
  //   });

  //   this.userInfo = {
  //     ...this.userInfo,
  //     subscribedTopics: userSubscribedTopics,
  //   };

  //   this.userApi.updateTekUserInfoCache(this.userInfo);
  //   this.navigateToActiveCapsulePage(true);
  // }

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

  doLoadFeedsForSelectedTopics(): void {
    let selectedTopics: string[] = this.filteredBrowseByTopics
      .filter(item => item.isSubscribed)
      .map(item => item.topic.code);

    // update local user cache for logged-in user.
    if (this.auth.isUserLoggedIn()) {
      this.userInfo = this.userApi.getTekUserInfoCache();
      const userSubscribedTopics = this.userInfo?.subscribedTopics ?? [];
      selectedTopics = [...new Set([...userSubscribedTopics, ...selectedTopics])];

      this.userInfo = {
        ...this.userInfo,
        subscribedTopics: selectedTopics,
      };

      this.userApi.updateTekUserInfoCache(this.userInfo);

      // update user subscription to backend
      // TODO: FIXME
    }

    // navigate to feeds and load data for selected topics.
    this.hideBroweByTopicModal();
    this.navigateToActiveCapsulePage(selectedTopics, true);
  }
}
