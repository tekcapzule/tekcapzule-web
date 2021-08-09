import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavTab } from '@app/shared';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  activeTab = 'adminCapsules';

  navTabs: NavTab[] = [
    { uniqueId: 'adminCapsules', navUrl: 'capsules', displayName: 'Capsules' },
    { uniqueId: 'adminTopics', navUrl: 'topics', displayName: 'Topics' },
    { uniqueId: 'adminFeedback', navUrl: 'feedback', displayName: 'Feedback' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activeTab = this.navTabs[0].uniqueId;
    this.router.navigate(['admin', this.navTabs[0].uniqueId]);
  }

  setActiveTab(navTab: NavTab): void {
    this.activeTab = navTab.uniqueId;
  }

  isActiveTab(navTab: NavTab): boolean {
    return this.activeTab === navTab.uniqueId;
  }
}
