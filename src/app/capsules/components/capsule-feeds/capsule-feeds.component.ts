import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
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
  TopicApiService,
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { Constants } from '@app/shared/utils';
import { Carousel } from 'primeng/carousel';
import { MessageService } from 'primeng/api';
import { TekUserInfo, TopicItem } from '@app/shared/models';
import { BrowseByTopic } from '@app/capsules/capsules-page.component';

@Component({
  selector: 'app-capsule-feeds',
  templateUrl: './capsule-feeds.component.html',
  styleUrls: ['./capsule-feeds.component.scss'],
})
export class CapsuleFeedsComponent implements OnInit, OnDestroy {
  isSharePostDialogShown = false;
  destroy$ = new Subject<boolean>();
  capsules = [];
  filteredCapsule = [];
  selectedCapsuleId: string;
  selectedCapsuleType: string;
  subrscription: Subscription[] = [];
  subscriberFormGroup: FormGroup;
  isMobileResolution: boolean;
  selectedTopics = [];
  userInfo: TekUserInfo = null;

  constructor(
    private auth: AuthStateService,
    private capsuleApi: CapsuleApiService,
    private userApi: UserApiService,
    public spinner: AppSpinnerService,
    private eventChannel: EventChannelService,
    private helperService: HelperService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private subscriptionApi: SubscriptionApiService,
    private topicApi: TopicApiService
  ) {
    Carousel.prototype.onTouchMove = (): void => {};
    this.eventChannel.publish({
      event: ChannelEvent.SetActiveFeedsTab,
      data: { tabUrl: 'myfeeds' },
    });
  }

  ngOnInit(): void {
    console.log('this.selectedTopics', this.selectedTopics);
    this.fetchUserInfo();
    this.getAllTopics()
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

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.auth.isUserLoggedIn()) {
      this.userApi
        .getTekUserInfo(this.auth.getAwsUserInfo().username, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }


  getAllTopics(): void {
    this.topicApi.getAllTopics().subscribe(topics => {
      this.setSelectedTopics(topics);
      this.fetchMyFeedCapsules();
    });
  }

  setSelectedTopics(topics: TopicItem[]): void {
    if (topics && topics.length > 0) {
      topics.forEach(topic  => {
        if (this.auth.isUserLoggedIn() && this.userInfo?.subscribedTopics) {
          this.selectedTopics.push(topic.code);
        } else {
          this.selectedTopics.push(topic.code);
        }
      });
    }
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

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
  }

  /**
   * Fetch my feed capsules based on user subscribed topics, if user logged in.
   * Otherwise load my feed capsules for default topics like AI, CLD and SWD.
   */
  fetchMyFeedCapsules(refreshCache: boolean = false): void {
    const userInfo = this.userApi.getTekUserInfoCache();

    const subscribedTopics = this.selectedTopics;

    this.spinner.show();

    this.capsuleApi
      .getMyFeedCapsules(subscribedTopics, refreshCache)
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

  showSharePostDialog() {
    this.isSharePostDialogShown = true;
  }

  hideSharePostDialog() {
    this.isSharePostDialogShown = false;
  }
}
