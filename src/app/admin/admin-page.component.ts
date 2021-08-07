import { Component, OnInit } from '@angular/core';

import { NavTabModel } from '@app/shared';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  activeTab = 'adminCapsules';

  navTabs: NavTabModel[] = [
    { uniqueId: 'adminCapsules', navUrl: 'capsules', displayName: 'Capsules' },
    { uniqueId: 'adminTopics', navUrl: 'topics', displayName: 'Topics' },
    { uniqueId: 'adminFeedback', navUrl: 'feedback', displayName: 'Feedback' },
  ];

  constructor() {}

  ngOnInit(): void {}

  setActiveTab(navTab: NavTabModel): void {
    this.activeTab = navTab.uniqueId;
  }

  isActiveTab(navTab: NavTabModel): boolean {
    return this.activeTab === navTab.uniqueId;
  }
}
