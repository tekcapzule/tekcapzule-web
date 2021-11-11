import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

import { EventChannelService, ChannelEvent, TopicApiService } from '@app/core';
import { Constants, NavTab, TopicItem } from '@app/shared';
import { AuthService } from '@app/auth';

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

  navTabs: NavTab[] = [
    { uniqueId: 'myFeeds', navUrl: 'myfeeds', displayName: 'My Feeds', isHidden: true },
    { uniqueId: 'trending', navUrl: 'trending', displayName: 'Trending' },
    { uniqueId: 'editorsPick', navUrl: 'editorspick', displayName: 'Editors Pick' },
  ];

  constructor(
    private router: Router,
    private eventChannel: EventChannelService,
    private authService: AuthService,
    private topicApiService: TopicApiService
  ) {}

  ngOnInit(): void {
    const isUserLoggedIn = this.authService.isUserLoggedIn();
    let activeNavTab: NavTab = this.navTabs[0];

    if (isUserLoggedIn) {
      this.navTabs[0].isHidden = false;
      activeNavTab = this.navTabs[0];
    } else {
      this.navTabs[0].isHidden = true;
      activeNavTab = this.navTabs[1];
    }

    this.activeTab = activeNavTab.uniqueId;
    this.router.navigate(['capsules', activeNavTab.navUrl]);

    this.eventChannel
      .getChannel()
      .pipe(filter(out => out.event === ChannelEvent.SetActiveTab))
      .subscribe(() => {
        const currActiveTab = this.authService.isUserLoggedIn() ? this.navTabs[0] : this.navTabs[1];
        this.activeTab = currActiveTab.uniqueId;
        this.router.navigate(['capsules', currActiveTab.navUrl]);
      });

    this.topicApiService
      .getAllTopics()
      .pipe(take(1))
      .subscribe(topics => {
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
      });
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
}
