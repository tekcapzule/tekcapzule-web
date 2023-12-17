import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppSpinnerService, DigestApiService, SubscriptionApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';
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
  

  constructor(
    public spinner: AppSpinnerService,
    private skillApi: SkillStudioApiService,
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
    this.skillApi.getAllLearning().subscribe(data => {
      const newsletter = this.helperService.getLearningMtsByType(data, 'Newsletter');
      let weeklyDigestList = newsletter.currentList;
      const podcast = this.helperService.getLearningMtsByType(data, 'Podcast');
      weeklyDigestList.push(...podcast.currentList);
      console.log('weeklyDigestList  ',weeklyDigestList, newsletter.currentList, podcast.currentList)
      weeklyDigestList.forEach(item => {
        if (!this.digest[item.learningMaterialType]) {
          this.digest[item.learningMaterialType] = [];
        }
        this.digest[item.learningMaterialType].push(item);
      });
      this.categories = Object.keys(this.digest).sort();
      this.spinner.hide();
    });
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
    sessionStorage.setItem('com.tekcapzule.pageURL', this.router.url);
    sessionStorage.setItem('com.tekcapzule.resourceURL', dig.resourceUrl);
    sessionStorage.setItem('com.tekcapzule.title', dig.title);
    this.router.navigateByUrl('/ai-hub/' + dig.code + '/detail?pageId=Weekly_Digest');
  }
}
