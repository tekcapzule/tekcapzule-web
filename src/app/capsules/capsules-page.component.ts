import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs/operators';

import {
  EventChannelService,
  ChannelEvent,
  TopicApiService,
  UserApiService,
  CapsuleApiService,
} from '@app/core';
import { Constants, NavTab, TopicItem, UserInfo } from '@app/shared';
import { AuthService } from '@app/auth';

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
    if (this.authService.isUserLoggedIn()) {
      this.userApiService
        .getUser(this.authService.getUserInfo().attributes.email)
        .pipe(take(1))
        .subscribe(userInfo => (this.userInfo = userInfo));
    } else {
      this.userInfo = null;
    }

    this.eventChannel
      .getChannel()
      .pipe(filter(out => out.event === ChannelEvent.SetActiveTab))
      .subscribe(() => {
        this.navigateToCapsulePage();
      });

    this.topicApiService
      .getAllTopics()
      .pipe(take(1))
      .subscribe(topics => {
        this.setTopicsByCategory(topics);
      });

    this.navigateToCapsulePage();
  }

  navigateToCapsulePage(): void {
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
      return this.userInfo.subscribedTopics.includes(topicCode);
    }

    return false;
  }

  followTopic(topicCode: string): void {
    if (!this.authService.isUserLoggedIn()) {
      jQuery('#browseByTopicModal').modal('hide');
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    const awsUserInfo = this.authService.getUserInfo();

    this.userApiService
      .followTopic(awsUserInfo.attributes.email, topicCode)
      .pipe(
        take(1),
        switchMap(() => this.userApiService.getUser(awsUserInfo.attributes.email, true)),
        switchMap(user => {
          this.userInfo = user;
          return this.capsuleApiService.getMyFeedCapsules(this.userInfo.subscribedTopics, true);
        }),
        map(() => {
          this.navigateToCapsulePage();
        })
      )
      .subscribe();
  }

  unfollowTopic(topicCode: string): void {
    if (!this.authService.isUserLoggedIn()) {
      jQuery('#browseByTopicModal').modal('hide');
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    throw new Error('Not yet implemented.');
  }
}
