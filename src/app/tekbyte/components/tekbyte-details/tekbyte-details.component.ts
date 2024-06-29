import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AppSpinnerService,
  SubscriptionApiService,
  TekByteApiService
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';
import { Constants } from '@app/shared/utils';
import { MessageService } from 'primeng/api';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';

@Component({
  selector: 'app-tekbyte-details',
  templateUrl: './tekbyte-details.component.html',
  styleUrls: ['./tekbyte-details.component.scss'],
})
export class TekbyteDetailsComponent implements OnInit, OnDestroy {
  learningMt: ILearningMaterial;
  titleUrl: string[];
  subscriberFormGroup: FormGroup;
  learningMtList: ILearningMaterial[] = [];
  relatedLearningMt: ILearningMaterial[] = [];
  responsiveOptions: any[] = Constants.ResponsiveOptions;
  pageId: string;

  constructor(
    private spinner: AppSpinnerService,
    private route: ActivatedRoute,
    private skillApi: SkillStudioApiService,
    private helperService: HelperService,
    private fb: FormBuilder,
    private subscriptionApi: SubscriptionApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
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
    // this.titleUrl = [this.helperService.getTileDetails('tekbyte').navUrl];
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.pageId = params['pageId'];
      this.getAllLearning(params['code']);
    });
  }

  getAllLearning(tekbyteCode: string) {
    this.skillApi.getAllLearning().subscribe(
      data => {
        if (data) {
          this.learningMtList = data;
          this.learningMt = this.learningMtList.find(tek => tek.learningMaterialId === tekbyteCode);
          this.randaomTekbyte();
          this.spinner.hide();
        }
      },
      err => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  randaomTekbyte() {
    this.relatedLearningMt = this.learningMtList.filter(lm =>
      lm.learningMaterialType === 'Tekbyte' && lm.topicCode === this.learningMt.topicCode && lm.learningMaterialId !== this.learningMt.learningMaterialId
    );
  }

  ngOnDestroy(): void {}

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
}
