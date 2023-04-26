import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AppSpinnerService, CapsuleApiService, EventChannelService, ChannelEvent } from '@app/core';
import { CapsuleItem } from '@app/shared/models';
import { CapsuleCardComponent } from '@app/shared/components/capsule-card/capsule-card.component';

@Component({
  selector: 'app-capsule-trending',
  templateUrl: './capsule-trending.component.html',
  styleUrls: ['./capsule-trending.component.scss'],
})
export class CapsuleTrendingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  capsules: CapsuleItem[] = [];
  @ViewChild('capsuleComp') capsuleComp: CapsuleCardComponent;

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

    this.eventChannel.publish({
      event: ChannelEvent.SetActiveTrendingTab,
      data: { tabUrl: 'trending' },
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
  
  onCardOpened(capsuleId) {
    this.capsuleComp.closeCard(capsuleId);
  }
}
