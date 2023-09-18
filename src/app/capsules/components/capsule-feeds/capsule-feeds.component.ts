import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AppSpinnerService,
  AuthStateService,
  CapsuleApiService,
  ChannelEvent,
  EventChannelService,
  UserApiService,
  SubscriptionApiService,
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { Constants } from '@app/shared/utils';
import { Carousel } from 'primeng/carousel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-capsule-feeds',
  templateUrl: './capsule-feeds.component.html',
  styleUrls: ['./capsule-feeds.component.scss'],
})
export class CapsuleFeedsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  capsules = [];
  filteredCapsule = [];
  selectedCapsuleId: string;
  selectedCapsuleType: string;
  subrscription: Subscription[] = [];
  subscriberFormGroup: FormGroup;
  constructor(
    private auth: AuthStateService,
    private capsuleApi: CapsuleApiService,
    private userApi: UserApiService,
    public spinner: AppSpinnerService,
    private eventChannel: EventChannelService,
    private helperService: HelperService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private subscriptionApi: SubscriptionApiService
  ) {
    Carousel.prototype.onTouchMove = (): void => {};
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
    this.subscribeFilterType();
    this.subscriberFormGroup = this.fb.group({
      emailId: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
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
    console.log('this.filteredCapsule', this.filteredCapsule);
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
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(capsules => {
        this.capsules = capsules;
        this.filterByCapsuleType();
      });

    this.capsuleApi
      .getEditorsPickCapsules(refreshCache)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(capsules => {
        this.capsules = capsules;
        this.filterByCapsuleType();
      });
  }

  onCardOpened(capsuleId: string): void {
    this.selectedCapsuleId = capsuleId;
  }
  onSubscribe(): void {
    this.subscriberFormGroup.markAsTouched();
    if (this.subscriberFormGroup.valid) {
      this.spinner.show();
      this.subscriptionApi.subscribeEmail(this.subscriberFormGroup.value.emailId).subscribe(
        data => {
          this.messageService.add({
            key: 'tc',
            severity: 'success',
            detail: 'Thank you for subscribing!',
          });
          this.subscriberFormGroup.reset();
          this.spinner.hide();
        },
        error => {
          this.messageService.add(this.helperService.getInternalErrorMessage());
          this.spinner.hide();
        }
      );
    } else {
      this.messageService.add({ key: 'tc', severity: 'error', detail: 'Enter valid email' });
    }
  }
}
