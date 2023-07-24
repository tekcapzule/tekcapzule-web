import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    { id: 'PODCAST', displayName: 'Podcast', bgColor:'', url: '/digest/podcast?id='},
    { id: 'NEWS_LETTER', displayName: 'News Letter', bgColor:'indigo-purple',  url: '/digest/newsletter?id='}
  ];

  constructor(private spinner: AppSpinnerService, private digestApiService: DigestApiService,
    private subscriptionApi: SubscriptionApiService, private fb: FormBuilder,
    private messageService: MessageService, private helperService: HelperService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscriberFormGroup = this.fb.group({
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
    this.getWeeklyDigest();
  }

  getWeeklyDigest() {
    this.digestApiService.getAllDigest().subscribe(data => {
      data.forEach(item => {
        if(!this.digest[item.category]) {
          this.digest[item.category] = [];
        }
        this.digest[item.category].push(item);
      });;
      this.categories = Object.keys(this.digest).sort();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
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

  openDigest(dig) {
    
  }
}
