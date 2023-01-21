import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ChannelEvent, EventChannelService } from '@app/core';
import { NavTab } from '@app/shared/models';
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  activeTab = 'adminCapsules';

  navTabs: NavTab[] = [
    { uniqueId: 'adminCapsules', navUrl: 'capsules', displayName: 'Capsules' },
    { uniqueId: 'adminTopics', navUrl: 'topics', displayName: 'Topics' },
    { uniqueId: 'adminFeedback', navUrl: 'feedback', displayName: 'Feedback' },
  ];

  constructor(private router: Router, private eventChannel: EventChannelService) {}

  ngOnInit(): void {
    this.activeTab = this.navTabs[0].uniqueId;
    this.router.navigate(['admin', this.navTabs[0].navUrl]);
    this. router.events.subscribe((val) => {
      if(val instanceof NavigationEnd && val.url){
        if(val.url.includes('edittopic') ||
        val.url.includes('createcapsule') || 
        val.url.includes('createtopic')){
          this.deActivateTabs();
        }
      }
  });

    this.eventChannel
      .getChannel()
      .pipe(
        filter(out => out.event === ChannelEvent.SetActiveAdminTab),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.activeTab = this.navTabs[0].uniqueId;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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

  isNavTabDeActivated(): boolean {
    return this.activeTab === Constants.None;
  }

  canHideNavTabs(): boolean {
    return this.activeTab === Constants.None;
  }
}
