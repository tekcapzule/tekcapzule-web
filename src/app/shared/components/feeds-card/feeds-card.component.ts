import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

import {
  AppSpinnerService,
  AuthService,
  AuthStateService,
  AwsUserInfo,
  CapsuleApiService,
  UserApiService,
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { CapsuleBadge, CapsuleItem, TekUserInfo, TopicItem } from '@app/shared/models';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-feeds-card',
  templateUrl: './feeds-card.component.html',
  styleUrls: ['./feeds-card.component.scss'],
})
export class FeedsCardComponent implements OnInit {
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
  @Input() selectedCapsuleId: string;
  @Input() capsule: CapsuleItem;
  @Output() cardOpened: EventEmitter<any> = new EventEmitter();
  topicDetail: TopicItem;
  subrscription: Subscription[] = [];
  isMobileResolution = false;
  resourceUrl: SafeResourceUrl;
  isOnFocus: boolean;
  @Input() index: number;
  
  constructor(
    private router: Router,
    private capsuleApi: CapsuleApiService,
    private userApi: UserApiService,
    private auth: AuthStateService,
    private spinner: AppSpinnerService,
    private messageService: MessageService,
    private clipboard: Clipboard,
    private helperService: HelperService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if(!this.auth.isUserLoggedIn()) {
      this.router.navigateByUrl(this.helperService.findPage('HOME').navUrl);
    }
    this.onResize();
    this.awsUserInfo = this.auth.getAwsUserInfo();
    if(this.capsule.type === 'VIDEO') {
      this.resourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/JzPfMbG1vrE');
    }
    this.cdr.detectChanges();
    
    this.topicDetail = this.helperService.getTopic(this.capsule.topicCode);
    this.dateAgoStr = moment(this.capsule.publishedDate, 'DD/MM/YYYY').fromNow();
  }

  ngOnDestroy(): void {
    this.subrscription.forEach((sub: Subscription) => sub.unsubscribe());
  }
  onResize() {
    const sub = this.helperService.onResizeChange$().subscribe(isMobileResolution => {
      this.isMobileResolution = isMobileResolution;
    });
    this.subrscription.push(sub);
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
    if (this.helperService.isLocalPublisher(this.capsule.publisher)) {
      this.spinner.show();
      sessionStorage.setItem('com.tekcapsule.pageURL', this.router.url);
      sessionStorage.setItem('com.tekcapsule.resourceURL', this.capsule.resourceUrl);
      sessionStorage.setItem('com.tekcapsule.title', this.capsule.title);
      this.router.navigate(['capsules', this.capsule.capsuleId, 'details']);
    } else {
      window.open(this.capsule.resourceUrl, '_blank');
    }
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
            detail: 'Thank you for the recommendation!',
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

  disableBookmark(): boolean {
    if (this.auth.isUserLoggedIn()) {
      return false;
    }
    return true;
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
    if (this.helperService.isLocalPublisher(this.capsule.publisher)) {
      const shareableUrl = `${window.location.origin}/capsules/${this.capsule.capsuleId}/details`;
      this.clipboard.copy(shareableUrl);
    } else {
      this.clipboard.copy(this.capsule.resourceUrl);
    }
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      detail: 'Link copied. You can share it now.',
    });
  }

  onInView(data: any): void {
    this.isOnFocus = data.inView;
    if(data.inView) {
      //console.log('inView--', data.inView, this.capsule.title, this.index);
    }
  }
}
