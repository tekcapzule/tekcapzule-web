import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AppSpinnerService,
  FeedApiService,
  EventChannelService,
  TopicApiService,
} from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { TopicItem } from '@app/shared/models';
import { MetadataItem } from '@app/shared/models/capsule-item.model';
import { ChannelEvent } from '@app/shared/models/channel-item.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contribute-feed',
  templateUrl: './contribute-feed.component.html',
  styleUrls: ['./contribute-feed.component.scss'],
})
export class ContributeFeedComponent implements OnInit, AfterViewInit {
  contributeFormGroup: FormGroup;
  allTopics: TopicItem[] = [];
  capsuleTypes: string[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private topicApi: TopicApiService,
    private feedApi: FeedApiService,
    private spinner: AppSpinnerService,
    private eventChannel: EventChannelService,
    public helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.getAllTopics(false);
    this.getCapsuleTypes(false);
    this.createContriubuteformGroup();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideCapsuleNavTabs });
    });
  }

  getAllTopics(refresh?: boolean): void {
    this.topicApi.getAllTopics(refresh).subscribe(topics => {
      this.allTopics = topics;
    });
  }

  getCapsuleTypes(refresh?: boolean) {
    this.feedApi.getMetadata(refresh).subscribe(data => {
      if (data && data.capsuleType) {
        this.capsuleTypes = data.capsuleType;
      }
    });
  }

  createContriubuteformGroup(): void {
    this.contributeFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      resourceUrl: ['', Validators.required],
      topicCode: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
    });
  }

  hasTopicSelected(): boolean {
    return this.contributeFormGroup.get('topicCode').value != '';
  }

  getCategoriesByTopicCode(): string[] {
    const selectedTopicCode = this.contributeFormGroup.get('topicCode').value;
    const topicForCode = this.allTopics.find(topic => topic.code === selectedTopicCode);

    if (topicForCode && topicForCode.categories) {
      return topicForCode.categories.map(cat => cat.title);
    }

    return [];
  }

  onCancel(): void {
    this.router.navigate([sessionStorage.getItem('com.tekcapzule.pageURL') || '/']);
  }

  onSubmit(): void {
    this.contributeFormGroup.markAllAsTouched();

    if (this.contributeFormGroup.valid) {
      const formValue = this.contributeFormGroup.value;
      this.spinner.show();

      this.feedApi
        .createCapsule({
          title: formValue.title,
          resourceUrl: formValue.resourceUrl,
          topicCode: formValue.topicCode,
          category: formValue.category,
          type: formValue.type,
          author: formValue.author,
          description: formValue.description,
        })
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe(() => {
          this.router.navigate(['capsules', 'congratz']);
        });
    }
  }
}
