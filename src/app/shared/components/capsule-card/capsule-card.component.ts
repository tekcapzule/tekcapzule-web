import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { CapsuleApiService, UserApiService, AuthService, AwsUserInfo } from '@app/core';
import { CapsuleBadge, CapsuleItem, UserInfo } from '@app/shared/models';

@Component({
  selector: 'app-capsule-card',
  templateUrl: './capsule-card.component.html',
  styleUrls: ['./capsule-card.component.scss'],
})
export class CapsuleCardComponent implements OnInit {
  isCardFlipped = false;
  userInfo: UserInfo = null;
  awsUserInfo: AwsUserInfo = null;

  @Input() capsule: CapsuleItem;

  constructor(
    private router: Router,
    private capsuleApi: CapsuleApiService,
    private userApi: UserApiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.auth.isUserLoggedIn()) {
      this.awsUserInfo = this.auth.getUserInfo();

      this.userApi
        .getUser(this.awsUserInfo.username, refreshCache)
        .subscribe(userInfo => (this.userInfo = userInfo));
    }
  }

  doFlipCard(): void {
    this.isCardFlipped = !this.isCardFlipped;
  }

  doStartReading(): void {
    window.open(this.capsule.resourceUrl, '_blank');
  }

  onCardClick(): void {
    this.capsuleApi.updateCapsuleViewCount(this.capsule.capsuleId).subscribe();
    window.open(this.capsule.resourceUrl, '_blank');
  }

  onCapsuleRecommend(): void {
    this.capsuleApi.updateCapsuleRecommendCount(this.capsule.capsuleId).subscribe();
  }

  isBookmarked(): boolean {
    if (!this.auth.isUserLoggedIn()) {
      return false;
    }

    return this?.userInfo?.bookmarks?.find(id => id === this.capsule.capsuleId) ? true : false;
  }

  onCapsuleBookmark(): void {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    this.userApi
      .bookmarCapsule(this.awsUserInfo.username, this.capsule.capsuleId)
      .pipe(
        tap(() => {
          this.capsuleApi.updateCapsuleBookmarkCount(this.capsule.capsuleId).subscribe();
        })
      )
      .subscribe(() => {
        this.fetchUserInfo(true);
      });

    this.userInfo = {
      ...this.userInfo,
      bookmarks: [...this.userInfo.bookmarks, this.capsule.capsuleId],
    };

    this.userApi.updateUserCache(this.userInfo);
  }

  onCapsuleBookmarkRemove(): void {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    this.userApi
      .removeCapsuleBookmark(this.awsUserInfo.username, this.capsule.capsuleId)
      .subscribe(() => {
        this.fetchUserInfo(true);
      });

    this.userInfo = {
      ...this.userInfo,
      bookmarks: this.userInfo.bookmarks.filter(id => id !== this.capsule.capsuleId),
    };

    this.userApi.updateUserCache(this.userInfo);
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
}
