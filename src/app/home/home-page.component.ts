import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  CapsuleApiService,
  SubscriptionApiService,
  UserApiService,
  AuthService,
  TopicApiService,
  AppSpinnerService,
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { CapsuleCardComponent } from '@app/shared/components/capsule-card/capsule-card.component';
import { CapsuleItem, TopicItem } from '@app/shared/models';
import { shuffleArray } from '@app/shared/utils';
import { MessageService } from 'primeng/api';
import { Carousel } from 'primeng/carousel';

declare const jQuery: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  capsules: CapsuleItem[] = [];
  topics: TopicItem[] = [];
  subscriberFormGroup: FormGroup;
  selectedCasuleId: string;
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
    private topicApi: TopicApiService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private spinner: AppSpinnerService,
    private helperService: HelperService
  ) {
    Carousel.prototype.onTouchMove = (): void => {};
  }

  ngOnInit(): void {
    this.subscriberFormGroup = this.fb.group({
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
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
    this.subscriberFormGroup.markAsTouched();
    if(this.subscriberFormGroup.valid) {
      this.spinner.show();
      this.subscriptionApi.subscribeEmail(this.subscriberFormGroup.value.emailId).subscribe(data => {
        this.messageService.add({ key: 'tc', severity: 'success', detail: 'Thank you for subscribing!' });
        this.subscriberFormGroup.reset();
        this.spinner.hide();
      }, error => {
        this.messageService.add(this.helperService.getInternalErrorMessage());
        this.spinner.hide();
      });
    } else {
      this.messageService.add({ key: 'tc', severity: 'error', detail: 'Enter valid email' });
    }
  }

  gotoCapsulesPage(): void {
    this.router.navigateByUrl('/capsules');
  }

  onCardOpened(capsuleId) {
    this.selectedCasuleId = capsuleId;
  }
}
