import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ChannelEvent, EventChannelService, TekByteApiService, TopicApiService } from '@app/core';

@Component({
  selector: 'app-admin-create-tekbyte',
  templateUrl: './admin-create-tekbyte.component.html',
  styleUrls: ['./admin-create-tekbyte.component.scss'],
})
export class AdminCreateTekByteComponent implements OnInit, AfterViewInit {
  isEditMode = false;
  tabIndex = 0;
  tabDetails: string[] = [
    'Top Banner',
    'Why, How & What',
    'Facts & Future',
    '3 Key Concepts',
    'Applications',
    'Trends',
    'Challenges',
    'Story So Far'
  ]
  tekByteFormGroup: FormGroup;

  constructor(
    private eventChannel: EventChannelService,
    private topicApi: TopicApiService,
    private tekByteAPI: TekByteApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.createTopicFormGroup();
    if (this.router.url.includes('edittekbyte')) {
      this.isEditMode = true;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eventChannel.publish({ event: ChannelEvent.HideAdminNavTabs });
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
      timeline: this.fb.array([this.fb.group({
        timelineDate: [''],
        description: ['']
      })])
    });
  }

  getKeyConceptFormArray() {
    const keyConcepts = this.fb.array([]);
    keyConcepts.push(this.getTitleAndDescFormGroup());
    keyConcepts.push(this.getTitleAndDescFormGroup());
    keyConcepts.push(this.getTitleAndDescFormGroup());
    return keyConcepts;
  }

  getTitleAndDescFormGroup(): FormGroup {
    return this.fb.group({
      title: [''],
      description: ['']
    })
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
    if(this.timeline.length < 10) {
      const timelineGp = this.fb.group({
        timelineDate: [''],
        storyDescription: ['']
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

  onSubmit(): void {
    const clearEmptyElementsInArray = (array: string[]) => array.filter(e => e);
    // this.topicDetails.aliases = clearEmptyElementsInArray(this.topicDetails.aliases);
    // this.topicDetails.keyHighlights = clearEmptyElementsInArray(this.topicDetails.keyHighlights);
    // this.topicDetails.capsules = clearEmptyElementsInArray(this.topicDetails.capsules);
    this.tekByteFormGroup.markAllAsTouched();
    if(this.tekByteFormGroup.valid) {
      if (this.isEditMode) {
        /*this.router.navigate(['/admin/capsules']);
        this.tekByteAPI.updateTopic(this.topicDetails).subscribe(res => {
          // console.log(this.topicDetails, res)
        });*/
      } else {
        /*this.tekByteAPI.createTekByte(this.topicDetails).subscribe(res => {
          // console.log(this.topicDetails, res)
        });*/
      }
    }

    this.showAdminNavTabs();
  }

  getDashboardLink() {
    return this.isEditMode ? ['../../capsules'] : ['../capsules'];
  }
}
