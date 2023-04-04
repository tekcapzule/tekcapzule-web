import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  CapsuleApiService,
  SubscriptionApiService,
  UserApiService,
  AuthService,
  TopicApiService,
} from '@app/core';
import { CapsuleItem, TopicItem } from '@app/shared/models';
import { shuffleArray } from '@app/shared/utils';

declare const jQuery: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  capsules: CapsuleItem[] = [];
  topics: TopicItem[] = [];
  subscriberEmailId = '';

  @ViewChild('subscribe') subscribeSection: ElementRef;
  responsiveOptions: any[] = [
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
  ];
  constructor(
    private router: Router,
    private capsuleApi: CapsuleApiService,
    private userApi: UserApiService,
    private auth: AuthService,
    private subscriptionApi: SubscriptionApiService,
    private topicApi: TopicApiService
  ) {}

  ngOnInit(): void {
    if (this.auth.isUserLoggedIn()) {
      this.userApi.getTekUserInfo(this.auth.getAwsUserInfo().username).subscribe();
    }

    this.capsuleApi.getEditorsPickCapsules().subscribe(capsules => {
      this.capsules = shuffleArray(capsules, 10);
    });

    this.topicApi.getAllTopics().subscribe(topics => {
      this.topics = shuffleArray(topics, 5);      
    });

    this.capsuleApi.getTrendingCapsules().subscribe();
  }



  onSubscribe(): void {
    this.subscriptionApi.subscribe(this.subscriberEmailId).subscribe();
    this.subscriberEmailId = '';
  }

  gotoCapsulesPage(): void {
    this.router.navigateByUrl('/capsules');
  }
}
