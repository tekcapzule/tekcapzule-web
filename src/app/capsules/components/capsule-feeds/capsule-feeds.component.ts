import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, finalize, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  AppSpinnerService,
  CapsuleApiService,
  EventChannelService,
  ChannelEvent,
  UserApiService,
  AuthService,
} from '@app/core';

@Component({
  selector: 'app-capsule-feeds',
  templateUrl: './capsule-feeds.component.html',
  styleUrls: ['./capsule-feeds.component.scss'],
})
export class CapsuleFeedsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  capsules = [];

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
        const refresh = event.data && event.data.refreshCache ? true : false;
        this.fetchMyFeedCapsules(refresh);
      });
  }

  ngOnInit(): void {
    this.fetchMyFeedCapsules(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  fetchMyFeedCapsules(refreshCache?: boolean): void {
    if (this.auth.isUserLoggedIn()) {
      this.spinner.show();
      const userInfo = this.userApi.getUserCache();

      this.capsuleApi
        .getMyFeedCapsules(userInfo.subscribedTopics || [], refreshCache)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe(capsules => {
          this.capsules = capsules;
        });
    }
  }
}
