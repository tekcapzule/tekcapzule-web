import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { EventChannelService, ChannelEvent } from '@app/core';
import { Constants, NavTab } from '@app/shared';

@Component({
  selector: 'app-capsules-page',
  templateUrl: './capsules-page.component.html',
  styleUrls: ['./capsules-page.component.scss'],
})
export class CapsulesPageComponent implements OnInit {
  activeTab = 'myFeeds';

  navTabs: NavTab[] = [
    { uniqueId: 'myFeeds', navUrl: 'myfeeds', displayName: 'My Feeds' },
    { uniqueId: 'trending', navUrl: 'trending', displayName: 'Trending' },
    { uniqueId: 'editorsPick', navUrl: 'editorspick', displayName: 'Editors Pick' },
  ];

  constructor(private router: Router, private eventChannel: EventChannelService) {}

  ngOnInit(): void {
    this.activeTab = this.navTabs[0].uniqueId;
    this.router.navigate(['capsules', this.navTabs[0].navUrl]);

    this.eventChannel
      .getChannel()
      .pipe(filter(out => out.event === ChannelEvent.SetActiveTab))
      .subscribe(() => {
        this.activeTab = this.navTabs[0].uniqueId;
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
