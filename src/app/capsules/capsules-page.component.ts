import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

import {
  EventChannelService,
  ChannelEvent,
  TopicApiService,
  UserApiService,
  CapsuleApiService,
  AppSpinnerService,
  AuthStateService,
} from '@app/core';
import { NavTab, TopicItem, TekUserInfo } from '@app/shared/models';
import { Constants } from '@app/shared/utils';
import { HelperService } from '@app/core/services/common/helper.service';
import { toUpperCamelCase } from '@app/shared/utils/common-utils';

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
  capsuleTypes: any[] = [];
  selectedCapsuleTypes: any[] = [];
  selectedTopics: string[] = [];
  currentSelectedTopic: BrowseByTopic[] = [];
  isFilterVisible: boolean = false;

  constructor(
    private router: Router,
    private eventChannel: EventChannelService,
    private auth: AuthStateService,
    private topicApi: TopicApiService,
    private userApi: UserApiService,
    private capsuleApi: CapsuleApiService,
    private spinner: AppSpinnerService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();
    this.getAllTopics(false);
    this.getMetadata();
    this.eventChannel
      .getChannel()
      .pipe(
        filter(
          out =>
            out.event === ChannelEvent.SetActiveFeedsTab ||
            out.event === ChannelEvent.SetActiveTrendingTab ||
            out.event == ChannelEvent.SetActiveEditorsTab
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(event => {
        const tabUrl = event?.data?.tabUrl ?? 'myfeeds';

        if (tabUrl != 'myfeeds') {
          this.navigateToCapsulePageByUrl(tabUrl, false);
        } else {
          this.navigateToActiveFeedsPage(null, false);
        }
      });

    this.eventChannel
      .getChannel()
      .pipe(
        filter(out => out.event === ChannelEvent.HideCapsuleNavTabs),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.deActivateTabs();
      });

    this.subscribeBrowseByTopicEvent();
  }

  getMetadata() {
    this.capsuleApi.getMetadata().subscribe(data => {
      data.capsuleType.forEach(type => {
        this.capsuleTypes.push({ code: type, name: type, displayName: toUpperCamelCase(type) });
      });
      this.capsuleTypes.push({ code: 'VIDEO', name: 'VIDEO', displayName: toUpperCamelCase('VIDEO') });
      this.capsuleTypes.push({ code: 'ARTICLE', name: 'ARTICLE', displayName: toUpperCamelCase('ARTICLE') });
      this.capsuleTypes.push({ code: 'NEWS', name: 'NEWS', displayName: toUpperCamelCase('NEWS') });
      this.capsuleTypes.push({ code: 'PAPER', name: 'PAPER', displayName: toUpperCamelCase('PAPER') });
    });
  }

  subscribeBrowseByTopicEvent() {
    this.eventChannel
      .getChannel()
      .pipe(
        filter(out => out.event === ChannelEvent.ShowBrowseByTopic),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.showBroweByTopicModal();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAllTopics(refresh?: boolean): void {
    this.topicApi.getAllTopics(refresh).subscribe(topics => {
      this.setBrowseByTopics(topics);
    });
  }

  hideBroweByTopicModal(): void {
    jQuery('#browseByTopicModal').modal('hide');
  }

  showBroweByTopicModal(): void {
    jQuery('#browseByTopicModal').modal('show');
  }

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.auth.isUserLoggedIn()) {
      this.userApi
        .getTekUserInfo(this.auth.getAwsUserInfo().username, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }

  navigateToActiveFeedsPage(topics: string[], refreshCache?: boolean): void {
    const activeNavTab = this.navTabs[0];
    this.activeTab = activeNavTab.uniqueId;

    this.router.navigate(['capsules', activeNavTab.navUrl]).then(() => {
      this.eventChannel.publish({
        event: ChannelEvent.LoadDataForActiveCapsuleTab,
        data: { topics, refreshCache },
      });
    });
  }

  navigateToCapsulePageByUrl(tabUrl: string, refreshCache?: boolean): void {
    this.activeTab = tabUrl === 'trending' ? 'trending' : 'editorsPick';

    this.router.navigate(['capsules', tabUrl]).then(() => {
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
        .map<BrowseByTopic>(topic => {
          const isSubscribed = this.isTopicSubscribed(topic.code);
          if (isSubscribed) {
            this.currentSelectedTopic.push({ topic, isSubscribed });
            this.selectedTopics.push(topic.code);
          }
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
    return this.activeTab === Constants.None || this.helperService.getMobileResolution();
  }

  canHideFilterAndTags(): boolean {
    return this.activeTab === Constants.None;
  }

  showFilterOption() {
    this.isFilterVisible = !this.isFilterVisible;
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
    if (item.isSubscribed && this.currentSelectedTopic.length === 1) {
      return;
    }
    item.isSubscribed = !item.isSubscribed;
    if (item.isSubscribed) {
      if (this.currentSelectedTopic.length >= 3) {
        this.filteredBrowseByTopics.find(
          topic => topic.topic.code === this.currentSelectedTopic[0].topic.code
        ).isSubscribed = false;
        this.currentSelectedTopic.splice(0, 1);
      }
      this.currentSelectedTopic.push(item);
    } else {
      const index = this.currentSelectedTopic.findIndex(
        topic => topic.topic.code === item.topic.code
      );
      this.currentSelectedTopic.splice(index, 1);
    }
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

    this.eventChannel.publish({
      event: ChannelEvent.LoadDataForActiveCapsuleTab,
      data: { topics: this.selectedTopics, refreshCache: true }
    });
  }

  doLoadFeedsForSelectedTopics(): void {
    this.selectedTopics = this.filteredBrowseByTopics
      .filter(item => item.isSubscribed)
      .map(item => item.topic.code);

    // update local user cache for logged-in user.
    if (this.auth.isUserLoggedIn()) {
      this.userInfo = this.userApi.getTekUserInfoCache();
      const userSubscribedTopics = this.userInfo?.subscribedTopics ?? [];
      this.selectedTopics = [...new Set([...userSubscribedTopics, ...this.selectedTopics])];

      this.userInfo = {
        ...this.userInfo,
        subscribedTopics: this.selectedTopics,
      };

      this.userApi.updateTekUserInfoCache(this.userInfo);

      // update user subscription to backend
      this.userApi
        .followTopic(this.auth.getAwsUserInfo().username, this.selectedTopics)
        .subscribe(() => {
          this.fetchUserInfo(true);
        });
    }

    // navigate to feeds and load data for selected topics.
    this.hideBroweByTopicModal();
    this.navigateToActiveFeedsPage(this.selectedTopics, true);
  }

  navigateToContributePage(): void {
    sessionStorage.setItem('com.tekcapsule.pageURL', this.router.url);
    this.deActivateTabs();
    this.router.navigate(['capsules', 'contribute']);
  }

  onChange(eve) {
    this.selectedCapsuleTypes = eve.value;
    const selectedTypes = [];
    if (eve.value.length) {
      this.selectedCapsuleTypes.forEach(type => selectedTypes.push(type.name));
      this.helperService.setFilterByCapsuleType(selectedTypes.toString());
    } else {
      this.helperService.setFilterByCapsuleType('');
    }
  }

  closeModal() {
    this.clearNewlySelectedTopics();
    this.searchInputValue = '';
    this.searchInputChanged('');
  }

  clearNewlySelectedTopics() {
    this.currentSelectedTopic = [];
    this.filteredBrowseByTopics.forEach(item => {
      if (this.selectedTopics.includes(item.topic.code)) {
        item.isSubscribed = true;
        this.currentSelectedTopic.push(item);
      } else {
        item.isSubscribed = false;
      }
    });
  }
}
