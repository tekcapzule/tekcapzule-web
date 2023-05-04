import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

import {
  AppSpinnerService,
  AuthService,
  AwsUserInfo,
  CapsuleApiService,
  UserApiService,
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { CapsuleBadge, CapsuleItem, TekUserInfo, TopicItem } from '@app/shared/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-capsule-card',
  templateUrl: './capsule-card.component.html',
  styleUrls: ['./capsule-card.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class CapsuleCardComponent implements OnInit {
  isCardFlipped = false;
  userInfo: TekUserInfo = null;
  awsUserInfo: AwsUserInfo = null;
  searchInputValue = '';
  isCapsuleViewed = false;
  isCapsuleBookmarked = false;
  isCapsuleRecommended = false;
  dateAgoStr: string;
  localPublisher: string[] = ['TEKCAPSULE', 'AITODAY', 'YOUTUBE'];
  buttonLabel: any = {
    article: 'Read',
    video: 'Play',
    book: 'Read',
    news: 'Read',
    jobs: 'apply',
    course: 'Enroll',
    event: 'Enroll',
    ad: 'View',
    product: 'Buy',
  };
  @Input() capsule: CapsuleItem;
  @Output() cardOpened: EventEmitter<any> = new EventEmitter();
  topicDetail: TopicItem;
  testKepoints = ["AI mimics human intelligence to some extent, can process information, learn from it, and make decisions based on that information", "There are several types of AI: Reactive Machines, Limited Memory, Theory of Mind, and Self-aware AI.", "AI relies on a range of techniques and technologies, including machine learning, natural language processing, computer vision, robotics, and expert systems."];
  flip: string = 'inactive';

  constructor(
    private router: Router,
    private capsuleApi: CapsuleApiService,
    private userApi: UserApiService,
    private auth: AuthService,
    private spinner: AppSpinnerService,
    private messageService: MessageService,
    private clipboard: Clipboard,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();
    this.topicDetail = this.helperService.getTopic(this.capsule.topicCode);
    this.dateAgoStr = moment(this.capsule.publishedDate, 'DD/MM/YYYY').fromNow();
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.auth.isUserLoggedIn()) {
      this.awsUserInfo = this.auth.getAwsUserInfo();

      this.userApi
        .getTekUserInfo(this.awsUserInfo.username, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }

  doFlipCard(): void {
    if (!this.isCapsuleViewed) {
      this.capsule.views += 1;
      this.isCapsuleViewed = true;
      this.capsuleApi.updateCapsuleViewCount(this.capsule.capsuleId).subscribe();
    }
    this.isCardFlipped = !this.isCardFlipped;
    if (this.isCardFlipped) {
      this.cardOpened.emit(this.capsule.capsuleId);
    }
  }

  doStartReading(): void {
    this.navigateToCapsuleDetailsPage();
  }

  onCardClick(): void {
    if (!this.isCapsuleViewed) {
      this.capsule.views += 1;
      this.isCapsuleViewed = true;
      this.capsuleApi.updateCapsuleViewCount(this.capsule.capsuleId).subscribe();
    }
    this.navigateToCapsuleDetailsPage();
  }

  navigateToCapsuleDetailsPage(): void {
    if (this.isLocalPublisher()) {
      this.spinner.show();
      this.router.navigate(['capsules', this.capsule.capsuleId, 'details']);
      sessionStorage.setItem('pageURL', this.router.url);
    } else {
      window.open(this.capsule.resourceUrl, '_blank');
    }
  }

  isLocalPublisher() {
    return this.localPublisher.find(pub => pub === this.capsule.publisher);
  }

  isValidUrl(url: string): boolean {
    return url.startsWith('https://') || url.startsWith('http://');
  }

  onCapsuleRecommend(): void {
    if (!this.isCapsuleRecommended) {
      this.capsule.recommendations += 1;
      this.isCapsuleRecommended = true;
      this.capsuleApi.updateCapsuleRecommendCount(this.capsule.capsuleId).subscribe(
        data => {
          this.messageService.add({
            key: 'tc',
            severity: 'success',
            summary: 'Success',
            detail: 'Recommandation done successfully',
          });
        },
        err => {
          this.capsule.recommendations -= 1;
          this.isCapsuleRecommended = false;
          this.messageService.add(this.helperService.getInternalErrorMessage());
        }
      );
    }
  }

  canShowBookmark(): boolean {
    if (this.auth.isUserLoggedIn()) {
      return true;
    }

    return false;
  }

  isBookmarked(): boolean {
    if (!this.auth.isUserLoggedIn()) {
      return false;
    }

    return this?.userInfo?.bookmarks?.find(id => id === this.capsule.capsuleId) ? true : false;
  }

  onCapsuleBookmark(): void {
    if (!this.auth.isUserLoggedIn()) {
      return;
    }

    this.userApi
      .bookmarCapsule(this.awsUserInfo.username, this.capsule.capsuleId)
      .pipe(
        tap(() => {
          this.capsuleApi.updateCapsuleBookmarkCount(this.capsule.capsuleId).subscribe(data => {
            this.messageService.add({
              key: 'tc',
              severity: 'success',
              summary: 'Success',
              detail: 'Bookmark done',
            });
          });
        })
      )
      .subscribe();

    this.userInfo = {
      ...this.userInfo,
      bookmarks: [...this.userInfo.bookmarks, this.capsule.capsuleId],
    };

    this.userApi.updateTekUserInfoCache(this.userInfo);

    if (!this.isCapsuleBookmarked) {
      this.capsule.bookmarks += 1;
      this.isCapsuleBookmarked = true;
    }
  }

  onCapsuleBookmarkRemove(): void {
    if (!this.auth.isUserLoggedIn()) {
      return;
    }

    this.userApi
      .removeCapsuleBookmark(this.awsUserInfo.username, this.capsule.capsuleId)
      .subscribe(data => {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Success',
          detail: 'Bookmark removed',
        });
      });

    this.userInfo = {
      ...this.userInfo,
      bookmarks: this.userInfo.bookmarks.filter(id => id !== this.capsule.capsuleId),
    };

    this.userApi.updateTekUserInfoCache(this.userInfo);
  }

  getCapsuleBadgeUrls(): string[] {
    if (this.capsule && this.capsule.badge) {
      switch (this.capsule.badge) {
        case CapsuleBadge.BRONZE:
          return ['/assets/images/badge-bronze.svg'];
        case CapsuleBadge.SILVER:
          return ['/assets/images/badge-bronze.svg', '/assets/images/badge-silver.svg'];
        case CapsuleBadge.GOLD:
          return [
            '/assets/images/badge-bronze.svg',
            '/assets/images/badge-silver.svg',
            '/assets/images/badge-gold.svg',
          ];
        default:
          return [];
      }
    }

    return [];
  }

  onShareClick() {
    if (this.isLocalPublisher()) {
      const shareableUrl = `${window.location.origin}/capsules/${this.capsule.capsuleId}/details`;
      this.clipboard.copy(shareableUrl);
    } else {
      this.clipboard.copy(this.capsule.resourceUrl);
    }
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: '',
      detail: 'Link copied. You can share it now.',
    });
  }

  closeCard(capsuleId: string) {
    if (this.capsule.capsuleId !== capsuleId) {
      this.isCardFlipped = false;
    }
  }
}
