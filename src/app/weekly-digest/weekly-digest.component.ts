import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppSpinnerService, DigestApiService, SubscriptionApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { IDigestItem } from '@app/shared/models/digest-item.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-weekly-digest',
  templateUrl: './weekly-digest.component.html',
  styleUrls: ['./weekly-digest.component.scss'],
})
export class WeeklyDigestComponent implements OnInit {
  digest: any = {};
  categories: string[] = [];
  subscriberFormGroup: FormGroup;
  categoryDetail = [
    {
      id: 'NEWS_LETTER',
      displayName: 'News Letter',
      url: '/digest/newsletter?id=',
    },
    { id: 'PODCAST', displayName: 'Podcast', bgColor: '', url: '/digest/podcast?id=' },
  ];

  constructor(
    public spinner: AppSpinnerService,
    private digestApiService: DigestApiService,
    private subscriptionApi: SubscriptionApiService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private helperService: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscriberFormGroup = this.fb.group({
      emailId: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
    this.getWeeklyDigest();
  }

  getWeeklyDigest() {
    this.digestApiService.getAllDigest().subscribe(
      data => {
        data.forEach(item => {
          if (!this.digest[item.category]) {
            this.digest[item.category] = [];
          }
          this.digest[item.category].push(item);
        });
        this.categories = Object.keys(this.digest).sort();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
      }
    );
  }

  onSubscribe(): void {
    this.subscriberFormGroup.markAsTouched();
    if (this.subscriberFormGroup.valid) {
      this.spinner.show();
      this.subscriptionApi.subscribeEmail(this.subscriberFormGroup.value.emailId).subscribe(
        data => {
          this.messageService.add({
            key: 'tc',
            severity: 'success',
            detail: 'Thank you for subscribing!',
          });
          this.subscriberFormGroup.reset();
          this.spinner.hide();
        },
        error => {
          this.messageService.add(this.helperService.getInternalErrorMessage());
          this.spinner.hide();
        }
      );
    } else {
      this.messageService.add({ key: 'tc', severity: 'error', detail: 'Enter valid email' });
    }
  }

  openDigest(dig) {
    console.log('dig.resourceUrl', dig.resourceURL);
    this.spinner.show();
    sessionStorage.setItem('com.tekcapsule.pageURL', this.router.url);
    sessionStorage.setItem('com.tekcapsule.resourceURL', dig.resourceUrl);
    sessionStorage.setItem('com.tekcapsule.title', dig.title);
    this.router.navigateByUrl('/ai-hub/' + dig.code + '/detail?pageId=Weekly_Digest');
  }
  
  onRecommendClick(eve, dig: IDigestItem) {
    eve.stopPropagation();
    this.digestApiService.updateRecommendCount(dig.code).subscribe(data => {
      dig.isRecommended = true;
      this.messageService.add({
        key: 'tc',
        severity: 'success',
        detail: 'Thank you for the recommendation!',
      });
    }, err => {
      this.messageService.add({
        key: 'tc',
        severity: 'error',
        detail: 'Please try again later!',
      });
    });
    return false;
  }
}
