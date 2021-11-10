import { AfterViewInit, Component, OnInit } from '@angular/core';

import { CapsuleApiService, TopicApiService } from '@app/core';
import { CapsuleItem } from '@app/shared';
import { take } from 'rxjs/operators';

declare const jQuery: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  tredingCapsules: CapsuleItem[] = [];

  constructor(
    private topicApiService: TopicApiService,
    private capsuleApiService: CapsuleApiService
  ) {}

  ngOnInit(): void {
    this.capsuleApiService
      .getEditorsPickCapsules()
      .pipe(take(1))
      .subscribe(capsules => {
        this.tredingCapsules = capsules;
        setTimeout(() => {
          this.initOwlCarousel();
        }, 0);
      });

    this.capsuleApiService.getTrendingCapsules().pipe(take(1)).subscribe();
    this.topicApiService.getAllTopics().pipe(take(1)).subscribe();
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
}
