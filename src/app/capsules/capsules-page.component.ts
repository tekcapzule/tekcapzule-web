import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { EventChannelService, ChannelEvent } from '@app/core';
import { Constants, NavTab } from '@app/shared';
import { AuthService } from '@app/auth';

@Component({
  selector: 'app-capsules-page',
  templateUrl: './capsules-page.component.html',
  styleUrls: ['./capsules-page.component.scss'],
})
export class CapsulesPageComponent implements OnInit {
  activeTab = 'myFeeds';

  navTabs: NavTab[] = [
    { uniqueId: 'myFeeds', navUrl: 'myfeeds', displayName: 'My Feeds', isHidden: true },
    { uniqueId: 'trending', navUrl: 'trending', displayName: 'Trending' },
    { uniqueId: 'editorsPick', navUrl: 'editorspick', displayName: 'Editors Pick' },
  ];

  constructor(
    private router: Router,
    private eventChannel: EventChannelService,
    private authService: AuthService
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
        this.activeTab = this.authService.isUserLoggedIn()
          ? this.navTabs[0].uniqueId
          : this.navTabs[1].uniqueId;
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
