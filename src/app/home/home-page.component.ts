import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

import {
  CapsuleApiService,
  SubscriptionApiService,
  TopicApiService,
  UserApiService,
} from '@app/core';
import { CapsuleItem } from '@app/shared/models';
import { AuthService } from '@app/auth';

declare const jQuery: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  capsules: CapsuleItem[] = [];
  subscriberEmailId = '';

  @ViewChild('subscribe') subscribeSection: ElementRef;

  constructor(
    private topicApiService: TopicApiService,
    private capsuleApiService: CapsuleApiService,
    private userApiService: UserApiService,
    private authService: AuthService,
    private subscriptionApiService: SubscriptionApiService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.userApiService
        .getUser(this.authService.getUserInfo().attributes.email)
        .subscribe();
    }

    this.capsuleApiService
      .getEditorsPickCapsules()
      .subscribe(capsules => {
        this.capsules = capsules;
        setTimeout(() => {
          this.initOwlCarousel();
        }, 0);
      });

    this.topicApiService.getAllTopics().subscribe();
  }

  ngAfterViewInit(): void {
    this.initOwlCarousel();
  }

  initOwlCarousel(): void {
    jQuery('#homepage_owl_carousel').owlCarousel({
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
    this.subscriptionApiService.subscribe(this.subscriberEmailId).subscribe();
    this.subscriberEmailId = '';
  }
}
