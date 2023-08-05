import { Component, OnInit } from '@angular/core';
import { filter, finalize, takeUntil } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService, ChannelEvent, EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { CapsuleItem } from '@app/shared/models';
import { Carousel } from 'primeng/carousel';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-editors-pick',
  templateUrl: './editors-pick.component.html',
  styleUrls: ['./editors-pick.component.scss'],
})
export class EditorsPickComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  capsules: CapsuleItem[] = [];
  selectedCapsuleId: string;
  filteredCapsule = [];
  selectedCapsuleType: string;
  subrscription: Subscription[] = [];

  constructor(
    private capsuleApi: CapsuleApiService,
    public spinner: AppSpinnerService,
    private eventChannel: EventChannelService,
    private helperService: HelperService
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
        this.fetchEditorsPickCapsules(refresh);
      });

    this.eventChannel.publish({
      event: ChannelEvent.SetActiveEditorsTab,
      data: { tabUrl: 'editorspick' },
    });
  }

  ngOnInit(): void {
    this.fetchEditorsPickCapsules(false);
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
    if (this.selectedCapsuleType) {
      this.filteredCapsule = this.capsules.filter(capsule => {
        return this.selectedCapsuleType.includes(capsule.type);
      });
    } else {
      this.filteredCapsule = this.capsules;
    }
  }

  fetchEditorsPickCapsules(refreshCache?: boolean): void {
    this.spinner.show();
    this.capsuleApi
      .getEditorsPickCapsules(refreshCache)
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
