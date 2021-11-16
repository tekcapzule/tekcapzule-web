import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, finalize, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  AppSpinnerService,
  CapsuleApiService,
  EventChannelService,
  ChannelEvent,
  UserApiService,
} from '@app/core';
import { AuthService } from '@app/auth';

@Component({
  selector: 'app-capsule-feeds',
  templateUrl: './capsule-feeds.component.html',
  styleUrls: ['./capsule-feeds.component.scss'],
})
export class CapsuleFeedsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  capsules = [];

  constructor(
    private authService: AuthService,
    private capsuleApiService: CapsuleApiService,
    private userApiService: UserApiService,
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
    if (this.authService.isUserLoggedIn()) {
      this.spinner.show();

      this.userApiService
        .getUser(this.authService.getUserInfo().attributes.email)
        .pipe(
          switchMap(userInfo =>
            this.capsuleApiService.getMyFeedCapsules(userInfo.subscribedTopics || [], refreshCache)
          ),
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
