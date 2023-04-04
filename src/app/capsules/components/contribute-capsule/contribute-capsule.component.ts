import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, CapsuleApiService, TopicApiService } from '@app/core';
import { TopicItem } from '@app/shared/models';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contribute-capsule',
  templateUrl: './contribute-capsule.component.html',
  styleUrls: ['./contribute-capsule.component.scss'],
})
export class ContributeCapsuleComponent implements OnInit {
  contributeFormGroup: FormGroup;
  allTopics: TopicItem[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private topicApi: TopicApiService,
    private capsuleApi: CapsuleApiService,
    private spinner: AppSpinnerService
  ) {}

  ngOnInit(): void {
    this.createContriubuteformGroup();
    this.topicApi.getAllTopics().subscribe(topics => {
      this.allTopics = topics;
    });
  }

  createContriubuteformGroup(): void {
    this.contributeFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      resourceUrl: ['', Validators.required],
      topicCode: ['', Validators.required],
      category: ['', Validators.required],
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
    const queryParamTab = this.route.snapshot.queryParamMap.get('tab') || 'myfeeds';
    this.router.navigate(['capsules', queryParamTab]);
  }

  onSubmit(): void {
    const queryParamTab = this.route.snapshot.queryParamMap.get('tab') || 'myfeeds';
    this.contributeFormGroup.markAllAsTouched();

    if (this.contributeFormGroup.valid) {
      const formValue = this.contributeFormGroup.value;
      this.spinner.show();

      this.capsuleApi
        .createCapsule({
          title: formValue.title,
          resourceUrl: formValue.resourceUrl,
          topicCode: formValue.topicCode,
          // category: formValue.category,
          description: formValue.description,
        })
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe(() => {
          this.router.navigate(['capsules', 'congratz'], { queryParams: { tab: queryParamTab } });
        });
    }
  }
}
