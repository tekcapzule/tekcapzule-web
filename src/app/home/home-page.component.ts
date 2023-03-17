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
export class HomePageComponent implements OnInit, AfterViewInit {
  capsules: CapsuleItem[] = [];
  topics: TopicItem[] = [];
  subscriberEmailId = '';

  @ViewChild('subscribe') subscribeSection: ElementRef;

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
      this.userApi.getUser(this.auth.getUserInfo().username).subscribe();
    }

    this.capsuleApi.getEditorsPickCapsules().subscribe(capsules => {
      this.capsules = shuffleArray(capsules, 10);
      setTimeout(() => {
        this.initOwlCarousel();
      }, 0);
    });

    this.topicApi.getAllTopics().subscribe(topics => {
      this.topics = shuffleArray(topics, 5);
      setTimeout(() => {
        this.initOwlCarousel();
      }, 0);
    });

    this.capsuleApi.getTrendingCapsules().subscribe();
  }

  ngAfterViewInit(): void {
    this.initOwlCarousel();
  }

  initOwlCarousel(): void {
    jQuery('.homepage_owl_carousel').owlCarousel({
      loop: true,
      margin: 10,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true,
        },
        768: {
          items: 2,
          nav: true,
        },
        1000: {
          items: 2,
          nav: true,
          loop: false,
        },
        1366: {
          items: 3,
          nav: true,
          loop: false,
        },
      },
    });
  }

  onSubscribe(): void {
    this.subscriptionApi.subscribe(this.subscriberEmailId).subscribe();
    this.subscriberEmailId = '';
  }

  gotoCapsulesPage(): void {
    this.router.navigateByUrl('/capsules');
  }
}
