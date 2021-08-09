import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavTab } from '@app/shared';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activeTab = this.navTabs[0].uniqueId;
    this.router.navigate(['capsules', this.navTabs[0].uniqueId]);
  }

  setActiveTab(navTab: NavTab): void {
    this.activeTab = navTab.uniqueId;
  }

  isActiveTab(navTab: NavTab): boolean {
    return this.activeTab === navTab.uniqueId;
  }

  deactivateTabs(): void {
    this.activeTab = 'none';
  }
}
