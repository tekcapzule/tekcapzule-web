import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import {
  CapsuleApiService,
  UserApiService,
  AuthService,
  AwsUserInfo,
  EventChannelService,
  ChannelEvent,
  AppSpinnerService,
} from '@app/core';
import { CapsuleBadge, CapsuleItem, TekUserInfo } from '@app/shared/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-capsule-card',
  templateUrl: './capsule-card.component.html',
  styleUrls: ['./capsule-card.component.scss'],
})
export class CapsuleCardComponent implements OnInit {
  isCardFlipped = false;
  userInfo: TekUserInfo = null;
  awsUserInfo: AwsUserInfo = null;
  searchInputValue = '';
  isCapsuleViewed = false;
  isCapsuleBookmarked = false;
  isCapsuleRecommended = false;

  @Input() capsule: CapsuleItem;
  @Output() cardOpened: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private capsuleApi: CapsuleApiService,
    private userApi: UserApiService,
    private auth: AuthService,
    private eventChannel: EventChannelService,
    private spinner: AppSpinnerService,
    private messageService: MessageService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();
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
    if(this.isCardFlipped) {
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
    this.spinner.show();
    const resourceUrl = this.isValidUrl(this.capsule.resourceUrl)
      ? btoa(this.capsule.resourceUrl)
      : btoa('https://tekcapsule.blog');

    const tabUri = this.router.url.includes('trending')
      ? 'trending'
      : this.router.url.includes('editorspick')
      ? 'editorspick'
      : 'myfeeds';

    this.router
      .navigate(['capsules', this.capsule.capsuleId, 'details'], {
        queryParams: { url: resourceUrl, title: this.capsule.title, tab: tabUri },
      })
      .then(() => {
        this.eventChannel.publish({ event: ChannelEvent.HideCapsuleNavTabs });
      });
  }

  isValidUrl(url: string): boolean {
    return url.startsWith('https://') || url.startsWith('http://');
  }

  onCapsuleRecommend(): void {
    if (!this.isCapsuleRecommended) {
      this.capsule.recommendations += 1;
      this.isCapsuleRecommended = true;
      this.capsuleApi.updateCapsuleRecommendCount(this.capsule.capsuleId).subscribe(data=> {
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'Recommandation done successfully' });
      });
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
            this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'Bookmark done' });
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
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'Bookmark removed' });
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
    this.clipboard.copy(this.capsule.resourceUrl);
    this.messageService.add({ key:'tc', severity: 'success', summary: '', detail: 'Link copied. You can share it now.' });
  }

  closeCard(capsuleId: string) {
    if(this.capsule.capsuleId !== capsuleId) {
      this.isCardFlipped = false;
    }
  }
}
