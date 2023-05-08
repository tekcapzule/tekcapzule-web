import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService, ChannelEvent, EventChannelService } from '@app/core';
import { CapsuleItem } from '@app/shared/models';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-capsule-trending',
  templateUrl: './capsule-trending.component.html',
  styleUrls: ['./capsule-trending.component.scss'],
})
export class CapsuleTrendingComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  capsules: CapsuleItem[] = [];
  selectedCapsuleId:string;
  filteredCapsule = [];
  selectedCapsuleType: string;
  subrscription: Subscription[] = [];

  constructor(
    private capsuleApi: CapsuleApiService,
    private spinner: AppSpinnerService,
    private eventChannel: EventChannelService,
    private helperService: HelperService
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
    this.subscribeFilterType();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  subscribeFilterType(): void {
    const sub = this.helperService.onFilterByCapsuleType$().subscribe(selectedCapsuleType => {
      this.selectedCapsuleType = selectedCapsuleType;
      this.filterByCapsuleType();
    });
    this.subrscription.push(sub);
  }

  filterByCapsuleType() {
    if(this.selectedCapsuleType) {
      this.filteredCapsule = this.capsules.filter(capsule => {
        return this.selectedCapsuleType.includes(capsule.type);
      });
    } else {
      this.filteredCapsule = this.capsules;
    }
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
        this.filterByCapsuleType();
      });
  }
  
  onCardOpened(capsuleId: string): void {
    this.selectedCapsuleId = capsuleId;
  }
}
