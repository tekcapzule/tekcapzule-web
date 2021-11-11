import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { CapsuleApiService, UserApiService } from '@app/core';
import { CapsuleItem } from '@app/shared';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth';

@Component({
  selector: 'app-capsule-card',
  templateUrl: './capsule-card.component.html',
  styleUrls: ['./capsule-card.component.scss'],
})
export class CapsuleCardComponent implements OnInit {
  isCardFlipped = false;
  @Input() isBookmarked: boolean;
  @Input() capsule: CapsuleItem;

  constructor(private capsuleApiService: CapsuleApiService, private userApiService : UserApiService,
    private router: Router, private authService: AuthService ){}

  ngOnInit(): void { }

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

  onCapsuleRecommend():void {
    this.capsuleApiService.updateCapsuleRecommendCount(this.capsule.capsuleId).pipe(take(1)).subscribe();
  }

  onCapsuleBookmark():void {
    if(!this.authService.isUserLoggedIn()){
      this.router.navigateByUrl("/auth/signin")
    }
    this.capsuleApiService.updateCapsuleBookmarkCount(this.capsule.capsuleId).pipe(take(1)).subscribe();
    this.userApiService.setUserBookmarks(this.capsule.capsuleId).pipe(take(1)).subscribe();
    this.isBookmarked=!this.isBookmarked;
    // this.userInfo.bookmarks = [...this.userInfo.bookmarks, this.capsule.capsuleId];
  }

  onCapsuleBookmarkRemove():void {
    this.userApiService.removeUserBookmarks(this.capsule.capsuleId).pipe(take(1)).subscribe();
    this.isBookmarked=!this.isBookmarked;
  }


}
