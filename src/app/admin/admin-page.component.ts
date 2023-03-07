import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ChannelEvent, EventChannelService } from '@app/core';
import { NavTab } from '@app/shared/models';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  isNavTabsHidden = false;
  activeTab = 'adminCapsules';

  navTabs: NavTab[] = [
    { uniqueId: 'adminCapsules', navUrl: 'capsules', displayName: 'Capsules' },
    { uniqueId: 'adminTopics', navUrl: 'topics', displayName: 'Topics' },
    { uniqueId: 'adminFeedback', navUrl: 'feedback', displayName: 'Feedback' },
  ];

  constructor(private eventChannel: EventChannelService) {}

  ngOnInit(): void {
    this.eventChannel
      .getChannel()
      .pipe(
        filter(out => out.event === ChannelEvent.HideAdminNavTabs),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isNavTabsHidden = true;
      });

    this.eventChannel
      .getChannel()
      .pipe(
        filter(out => out.event === ChannelEvent.ShowAdminNavTabs),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isNavTabsHidden = false;
      });

    this.eventChannel
      .getChannel()
      .pipe(
        filter(out => out.event === ChannelEvent.SetAdminCapsulesNavTab),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.activeTab = this.navTabs[0].uniqueId;
        this.isNavTabsHidden = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  isNavTabsVisible(): boolean {
    return !this.isNavTabsHidden;
  }

  setActiveTab(navTab: NavTab): void {
    this.activeTab = navTab.uniqueId;
  }

  isActiveTab(navTab: NavTab): boolean {
    return this.activeTab === navTab.uniqueId;
  }
}
