import { Component, OnInit } from '@angular/core';

import { NavTabModel } from '@app/shared';

@Component({
  selector: 'app-capsules-page',
  templateUrl: './capsules-page.component.html',
  styleUrls: ['./capsules-page.component.scss'],
})
export class CapsulesPageComponent implements OnInit {
  activeTab = 'myFeeds';

  navTabs: NavTabModel[] = [
    { uniqueId: 'myFeeds', navUrl: 'myfeeds', displayName: 'My Feeds' },
    { uniqueId: 'trending', navUrl: 'trending', displayName: 'Trending' },
    { uniqueId: 'editorsPick', navUrl: 'editorspick', displayName: 'Editors Pick' },
  ];

  constructor() {}

  ngOnInit(): void {}

  setActiveTab(navTab: NavTabModel): void {
    this.activeTab = navTab.uniqueId;
  }

  isActiveTab(navTab: NavTabModel): boolean {
    return this.activeTab === navTab.uniqueId;
  }

  deactivateTabs(): void {
    this.activeTab = 'none';
  }
}
