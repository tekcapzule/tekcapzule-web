import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

import {
  AppSpinnerService,
  AuthService,
  AuthStateService,
  AwsUserInfo,
  FeedApiService,
  UserApiService,
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { CapsuleBadge, IFeedItem, TekUserInfo, TopicItem } from '@app/shared/models';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IBookmarkItem } from '@app/shared/models/user-info.model';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {
  userInfo: TekUserInfo;
  awsUserInfo: AwsUserInfo = null;
  searchInputValue = '';
  isFeedViewed = false;
  isFeedBookmarked = false;
  isFeedRecommended = false;
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
  @Input() selectedFeedId: string;
  @Input() feed: IFeedItem;
  @Output() cardOpened: EventEmitter<any> = new EventEmitter();
  topicDetail: TopicItem;
  subrscription: Subscription[] = [];
  isMobileResolution = false;

  constructor(
    private router: Router,
    private feedApi: FeedApiService,
    private userApi: UserApiService,
    private auth: AuthStateService,
    private spinner: AppSpinnerService,
    private messageService: MessageService,
    private clipboard: Clipboard,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    if(!this.auth.isUserLoggedIn()) {
      this.router.navigateByUrl(this.helperService.findPage('HOME').navUrl);
    }
    this.onResize();
    this.awsUserInfo = this.auth.getAwsUserInfo();
    this.userInfo = this.userApi.getUserInfo();
    this.topicDetail = this.helperService.getTopic(this.feed.topicCode);
    this.dateAgoStr = moment(this.feed.publishedDate, 'DD/MM/YYYY').fromNow();
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
    this.navigateToFeedDetailsPage();
  }

  onCardClick(): void {
    if (!this.isFeedViewed) {
      this.feed.views += 1;
      this.isFeedViewed = true;
      this.feedApi.updateFeedViewCount(this.feed.feedId).subscribe();
    }
    this.navigateToFeedDetailsPage();
  }

  navigateToFeedDetailsPage(): void {
    if (this.helperService.isLocalPublisher(this.feed.publisher)) {
      this.spinner.show();
      sessionStorage.setItem('com.tekcapzule.pageURL', this.router.url);
      sessionStorage.setItem('com.tekcapzule.resourceURL', this.feed.resourceUrl);
      sessionStorage.setItem('com.tekcapzule.title', this.feed.title);
      this.router.navigate(['feeds', this.feed.feedId, 'details']);
    } else {
      window.open(this.feed.resourceUrl, '_blank');
    }
  }

  isValidUrl(url: string): boolean {
    return url.startsWith('https://') || url.startsWith('http://');
  }

  onFeedRecommend(): void {
    if (!this.isFeedRecommended) {
      this.feed.recommendations += 1;
      this.isFeedRecommended = true;
      this.feedApi.updateFeedRecommendCount(this.feed.feedId).subscribe(
        data => {
          this.messageService.add({
            key: 'tc',
            severity: 'success',
            detail: 'Thank you for the recommendation!',
          });
        },
        err => {
          this.feed.recommendations -= 1;
          this.isFeedRecommended = false;
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

    return this?.userInfo?.bookmarks?.find(bm => bm.resourceId === this.feed.feedId) ? true : false;
  }

  getBookmarkReqBody(): IBookmarkItem {
    const bookmarks: IBookmarkItem = {
      resourceType: 'FEED',
      resourceContentType: this.feed.type,
      resourceId: this.feed.feedId,
      title: this.feed.title,
      resourceUrl: this.feed.resourceUrl,
      publisher: this.feed.publisher
    }
    return bookmarks;
  }

  onFeedBookmark(): void {
    if (!this.auth.isUserLoggedIn()) {
      return;
    }
    const bookmark = this.getBookmarkReqBody();
    this.userApi
      .bookmarFeed(this.awsUserInfo.username, bookmark)
      .pipe(
        tap(() => {
          this.feedApi.updateFeedBookmarkCount(this.feed.feedId).subscribe(data => {
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
      bookmarks: [...this.userInfo.bookmarks, bookmark],
    };

    this.userApi.updateTekUserInfoCache(this.userInfo);

    if (!this.isFeedBookmarked) {
      this.feed.bookmarks += 1;
      this.isFeedBookmarked = true;
    }
  }

  onFeedBookmarkRemove(): void {
    if (!this.auth.isUserLoggedIn()) {
      return;
    }
    const bookmark = this.getBookmarkReqBody();
    
    this.userApi
      .removeFeedBookmark(this.awsUserInfo.username, bookmark)
      .subscribe(data => {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          detail: 'Bookmark removed',
        });
      });

    this.userInfo = {
      ...this.userInfo,
      bookmarks: this.userInfo.bookmarks.filter(bm => bm.resourceId !== this.feed.feedId),
    };

    this.userApi.updateTekUserInfoCache(this.userInfo);
  }

  getCapsuleBadgeUrls(): string[] {
    if (this.feed && this.feed.badge) {
      switch (this.feed.badge) {
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
    if (this.helperService.isLocalPublisher(this.feed.publisher)) {
      const shareableUrl = `${window.location.origin}/feeeds/${this.feed.feedId}/details`;
      this.clipboard.copy(shareableUrl);
    } else {
      this.clipboard.copy(this.feed.resourceUrl);
    }
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      detail: 'Link copied. You can share it now.',
    });
  }
}
