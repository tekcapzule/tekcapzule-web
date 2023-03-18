import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';

import { AppSpinnerService, CapsuleApiService, EventChannelService, ChannelEvent } from '@app/core';
import { CapsuleItem } from '@app/shared/models';

@Component({
  selector: 'app-capsule-trending',
  templateUrl: './capsule-trending.component.html',
  styleUrls: ['./capsule-trending.component.scss'],
})
export class CapsuleTrendingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  capsules: CapsuleItem[] = [];

  constructor(
    private capsuleApi: CapsuleApiService,
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
        this.fetchTrendingCapsules(refresh);
      });
  }

  ngOnInit(): void {
    this.fetchTrendingCapsules(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  fetchTrendingCapsules(refreshCache?: boolean): void {
    this.spinner.show();

    this.capsuleApi
      .getTrendingCapsules(refreshCache)
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
