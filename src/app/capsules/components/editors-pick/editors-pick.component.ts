import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, finalize, takeUntil } from 'rxjs/operators';

import { AppSpinnerService, CapsuleApiService, ChannelEvent, EventChannelService } from '@app/core';
import { Subject } from 'rxjs';
import { CapsuleItem } from '@app/shared/models';
import { CapsuleCardComponent } from '@app/shared/components/capsule-card/capsule-card.component';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-editors-pick',
  templateUrl: './editors-pick.component.html',
  styleUrls: ['./editors-pick.component.scss'],
})
export class EditorsPickComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  capsules: CapsuleItem[] = [];
  @ViewChild('capsuleComp') capsuleComp: CapsuleCardComponent;

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
        this.fetchEditorsPickCapsules(refresh);
      });

    this.eventChannel.publish({
      event: ChannelEvent.SetActiveEditorsTab,
      data: { tabUrl: 'editorspick' },
    });
  }

  ngOnInit(): void {
    this.fetchEditorsPickCapsules(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
      });
  }
  
  onCardOpened(capsuleId) {
    console.log('capsuleId ------   ',capsuleId);
    this.capsuleComp.closeCard(capsuleId);
  }
}
