import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService, ChannelEvent, EventChannelService } from '@app/core';
import { CapsuleItem } from '@app/shared/models';
import { CapsuleCardComponent } from '@app/shared/components/capsule-card/capsule-card.component';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-capsule-trending',
  templateUrl: './capsule-trending.component.html',
  styleUrls: ['./capsule-trending.component.scss'],
})
export class CapsuleTrendingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  capsules: CapsuleItem[] = [];
  selectedCapsuleId: string;

  constructor(
    private capsuleApi: CapsuleApiService,
    private spinner: AppSpinnerService,
    private eventChannel: EventChannelService
  ) {
    Carousel.prototype.onTouchMove = (): void => {};
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
    this.selectedCapsuleId = capsuleId;
  }
}
