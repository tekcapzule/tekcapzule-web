import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { CapsuleApiService, UserApiService } from '@app/core';
import { CapsuleItem, UserInfo } from '@app/shared';
import { AuthService, AwsUserInfo } from '@app/auth';

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
    private capsuleApiService: CapsuleApiService,
    private userApiService: UserApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo(refreshCache?: boolean): void {
    if (this.authService.isUserLoggedIn()) {
      this.awsUserInfo = this.authService.getUserInfo();

      this.userApiService
        .getUser(this.awsUserInfo.attributes.email, refreshCache)
        .pipe(take(1))
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
    this.capsuleApiService.updateCapsuleViewCount(this.capsule.capsuleId).pipe(take(1)).subscribe();
    window.open(this.capsule.resourceUrl, '_blank');
  }

  onCapsuleRecommend(): void {
    this.capsuleApiService
      .updateCapsuleRecommendCount(this.capsule.capsuleId)
      .pipe(take(1))
      .subscribe();
  }

  onCapsuleBookmark(): void {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    this.capsuleApiService
      .updateCapsuleBookmarkCount(this.capsule.capsuleId)
      .pipe(take(1))
      .subscribe();

    this.userApiService
      .setUserBookmarks(this.awsUserInfo.attributes.email, this.capsule.capsuleId)
      .pipe(take(1))
      .subscribe(() => {
        this.fetchUserInfo(true);
      });
  }

  isBookmarked(): boolean {
    if (!this.authService.isUserLoggedIn()) {
      return false;
    }

    return !!this.userInfo.bookmarks.find(id => id === this.capsule.capsuleId);
  }

  onCapsuleBookmarkRemove(): void {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth/signin');
      return;
    }

    this.userApiService
      .removeUserBookmarks(this.awsUserInfo.attributes.email, this.capsule.capsuleId)
      .pipe(take(1))
      .subscribe(() => {
        this.fetchUserInfo(true);
      });
  }
}
