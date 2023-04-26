import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  AppSpinnerService,
  CapsuleApiService,
  EventChannelService,
  ChannelEvent,
  UserApiService,
  AuthService,
} from '@app/core';
import { Constants } from '@app/shared/utils';
import { CapsuleCardComponent } from '@app/shared/components/capsule-card/capsule-card.component';

@Component({
  selector: 'app-capsule-feeds',
  templateUrl: './capsule-feeds.component.html',
  styleUrls: ['./capsule-feeds.component.scss'],
})
export class CapsuleFeedsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  capsules = [];
  @ViewChild('capsuleComp') capsuleComp: CapsuleCardComponent;

  constructor(
    private auth: AuthService,
    private capsuleApi: CapsuleApiService,
    private userApi: UserApiService,
    private spinner: AppSpinnerService,
    private eventChannel: EventChannelService
  ) {
    this.eventChannel
      .getChannel()
      .pipe(
        filter(out => out.event === ChannelEvent.LoadDataForActiveCapsuleTab),
        takeUntil(this.destroy$)
      )
      .subscribe(event => {
        const refresh = event?.data?.refreshCache ? true : false;
        const topics = event?.data?.topics ?? null;
        this.fetchMyFeedCapsules(topics, refresh);
      });

    this.eventChannel.publish({
      event: ChannelEvent.SetActiveFeedsTab,
      data: { tabUrl: 'myfeeds' },
    });
  }

  ngOnInit(): void {
    this.fetchMyFeedCapsules(null, false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Fetch my feed capsules based on user subscribed topics, if user logged in.
   * Otherwise load my feed capsules for default topics like AI, CLD and SWD.
   */
  fetchMyFeedCapsules(topics: string[], refreshCache?: boolean): void {
    const userInfo = this.userApi.getTekUserInfoCache();

    const subscribedTopics = topics
      ? topics
      : this.auth.isUserLoggedIn() && userInfo?.subscribedTopics?.length > 0
      ? userInfo.subscribedTopics
      : Constants.DefaultSubscriptionTopics;

    this.spinner.show();

    this.capsuleApi
      .getMyFeedCapsules(subscribedTopics, refreshCache)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(capsules => {
        this.capsules = capsules;
      });
  }
  
  onCardOpened(capsuleId) {
    this.capsuleComp.closeCard(capsuleId);
  }
}
