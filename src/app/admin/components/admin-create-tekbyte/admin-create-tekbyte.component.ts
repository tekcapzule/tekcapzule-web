import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppSpinnerService, ChannelEvent, EventChannelService, TekByteApiService, TopicApiService } from '@app/core';
import { TopicCategoryItem, TopicItem } from '@app/shared/models';
import { TekByteItem } from '@app/shared/models/tekbyte-item.model';
import * as moment from 'moment';
import { Create_TekByte } from './create-tekbyte.constants';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MessageService } from 'primeng/api';
import { HelperService } from '@app/core/services/common/helper.service';

@Component({
  selector: 'app-admin-create-tekbyte',
  templateUrl: './admin-create-tekbyte.component.html',
  styleUrls: ['./admin-create-tekbyte.component.scss'],
})
export class AdminCreateTekByteComponent implements OnInit, AfterViewInit {
  isEditMode = false;
  tabIndex = 0;
  tabDetails: string[] = Create_TekByte.tabDetails;
  topics: TopicItem[] = [];
  tekByteFormGroup: FormGroup;
  categories: TopicCategoryItem[] = [];
  tekbyte: TekByteItem;
  tagsValue: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private eventChannel: EventChannelService,
    private topicApi: TopicApiService,
    private tekByteAPI: TekByteApiService,
    private spinner: AppSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    if (this.router.url.includes('edittekbyte')) {
      this.isEditMode = true;
      this.getTekByte();
    }
    this.createTopicFormGroup();
    this.getAllTopics();
  }

  getTekByte() {
    const tekbyteCode = sessionStorage.getItem('tekbyteCode');
    this.tekByteAPI.getTekByte(tekbyteCode).subscribe(data => {
      this.tekbyte = data;
      console.log(' tekbyte ------>> ', tekbyteCode, this.tekbyte);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideAdminNavTabs });
    });
  }

  getAllTopics() {
    this.topicApi.getAllTopics().subscribe(topics => {
      this.topics = topics;
      this.spinner.hide();
    }, error => {
      console.log(' ee', error);
      this.spinner.hide();
    });
  }

  createTopicFormGroup() {
    this.tekByteFormGroup = this.fb.group({
      code: [''],
      topicCode: ['', Validators.required],
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      summary: ['', Validators.required],
      categories: ['', Validators.required],
      description: ['', Validators.required],
      aliases: ['', Validators.required],
      goldenCircle: this.fb.group({
        why: [''],
        how: [''],
        what: [''],
      }),
      didYouKnow: [''],
      wayForward: [''],
      keyConcepts: this.getKeyConceptFormArray(),
      applications: this.fb.array([this.getTitleAndDescFormGroup()]),
      currentTrends: this.fb.array([this.getTitleAndDescFormGroup()]),
      challenges: this.fb.array([this.getTitleAndDescFormGroup()]),
      timeline: this.fb.array([
        this.fb.group({
          title: [''],
          description: [''],
        }),
      ]),
    });
  }

  getKeyConceptFormArray() {
    const keyConcepts = this.fb.array([]) as FormArray;
    keyConcepts.push(this.getTitleAndDescFormGroup());
    keyConcepts.push(this.getTitleAndDescFormGroup());
    keyConcepts.push(this.getTitleAndDescFormGroup());
    return keyConcepts;
  }

  getTitleAndDescFormGroup(): FormGroup {
    return this.fb.group({
      title: [''],
      description: [''],
    });
  }

  onAddTitleAndDesc(fieldName) {
    const field = this.tekByteFormGroup.get(fieldName) as FormArray;
    field.push(this.getTitleAndDescFormGroup());
  }

  get goldenCircle() {
    return this.tekByteFormGroup.get('goldenCircle') as FormGroup;
  }
  get keyConcepts() {
    return this.tekByteFormGroup.get('keyConcepts') as FormArray;
  }
  get applications() {
    return this.tekByteFormGroup.get('applications') as FormArray;
  }
  get currentTrends() {
    return this.tekByteFormGroup.get('currentTrends') as FormArray;
  }
  get challenges() {
    return this.tekByteFormGroup.get('challenges') as FormArray;
  }
  get timeline() {
    return this.tekByteFormGroup.get('timeline') as FormArray;
  }

  addStoryFormArray() {
    if (this.timeline.length < 10) {
      const timelineGp = this.fb.group({
        title: [''],
        description: [''],
      });
      this.timeline.push(timelineGp);
    }
  }

  onDeleteArrayItem(index: number, fieldName) {
    const field = this.tekByteFormGroup.get(fieldName) as FormArray;
    field.removeAt(index);
  }

  onTabChange(index: number) {
    this.tabIndex = index;
  }

  showAdminNavTabs(): void {
    this.eventChannel.publish({ event: ChannelEvent.SetAdminCapsulesNavTab });
  }


  getDashboardLink() {
    return this.isEditMode ? ['../../capsules'] : ['../capsules'];
  }

  onTopicChange(event) {
    const topicCode = event.target.value;
    if(topicCode) {
      const topic = this.topics.find(topic => topic.code === topicCode);
      this.categories = topic.categories;
      console.log(' ----------', topic);
      this.tekByteFormGroup.patchValue({
        description: topic.description,
        imageUrl: topic.imageUrl,
        status: topic.status,
        summary: topic.summary,
        title: topic.title
      })
    }
  }

  
  onSubmit(): void {
    this.tekByteFormGroup.markAllAsTouched();
    console.log(' ----- ', this.tekByteFormGroup.valid, this.tekByteFormGroup.value);
    if (this.tekByteFormGroup.valid) {
      this.spinner.show();
      const requestBody = this.tekByteFormGroup.value;
      requestBody.timeline.forEach(tm => {
        tm.title = moment(tm.title).format('DD/MM/YYYY')
      });
      if (this.isEditMode) {
        this.tekByteAPI.updateTekByte(requestBody).subscribe(res => {
          this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'TekByte created successfully'});
          this.spinner.hide();
        }, error => {
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try after sometime'});
          this.spinner.hide();
        });
      } else {
        this.tekByteAPI.createTekByte(requestBody).subscribe((res) => {
          this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'TekByte updated successfully'});
          this.spinner.hide();
        }, error => {
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try after sometime'});
          this.spinner.hide();
        });
      }
    }
  }

  
  get tags() {
    return this.tekByteFormGroup.get('aliases');
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tagsValue.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

  }

  remove(tag: string): void {
    const index = this.tagsValue.indexOf(tag);

    if (index >= 0) {
      this.tagsValue.splice(index, 1);
    }
    
  }

}
