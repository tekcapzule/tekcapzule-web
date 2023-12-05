import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, CourseApiService, EventChannelService, TopicApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { TopicItem } from '@app/shared/models';
import { ICourseDetail } from '@app/shared/models/course-item.model';
import { shuffleArray } from '@app/shared/utils';
import * as moment from 'moment';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ChannelEvent } from '@app/shared/models/channel-item.model';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';

@Component({
  selector: 'app-skill-dashboard',
  templateUrl: './skill-dashboard.component.html',
  styleUrls: ['./skill-dashboard.component.scss'],
})
export class SkillDashboardComponent implements OnInit {
  courseList: ILearningMaterial[] = [];
  filteredCourseList: ILearningMaterial[] = [];
  topics: TopicItem[] = [];
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];
  selectedDeliveryMode: any[] = [];
  selectedSkillstudioCategories: any[] = [];
  paymentCategories: any[] = [
    { name: 'Free', key: 'Free' },
    { name: 'Freemium', key: 'Freemium' },
    { name: 'Premium', key: 'Premium' },
    { name: 'Paid', key: 'Standard' },
  ];
  deliveryMode: any[] = [
    { name: 'Online', key: 'ONLINE' },
    { name: 'Hybrid', key: 'HYBRID' },
    { name: 'In Classroom', key: 'IN_CLASSROOM' },
  ];
  skillstudioCategories: any[] = [
    { name: 'All', key: 'All' },
    { name: 'Tekbyte', key: 'Tekbyte' },
    { name: 'Course', key: 'Course' },
    { name: 'Interview Prep', key: 'Interview_Prep' },
    { name: 'Video', key: 'Video' },
    { name: 'Research Paper', key: 'Research_Paper' },
    { name: 'Newsletter', key: 'Newsletter' },
    { name: 'Podcast', key: 'Podcast' },
    { name: 'Event', key: 'Event' },
    { name: 'Recorded Event', key: 'Recorded_Event' },
    { name: 'Book', key: 'Book' },
  ];
  searchText: string;
  isMobileResolution: boolean;
  isFilterVisible = true;
  isSortVisible = true;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];

  constructor(
    public spinner: AppSpinnerService,
    private skillStudioApi: SkillStudioApiService,
    private topicApi: TopicApiService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private router: Router,
    private eventChannel: EventChannelService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.onResize();
    this.subscribeFilter();
    this.topicApi.getAllTopics().subscribe(topics => {
      this.topics = shuffleArray(topics, 5);
    });
    this.skillStudioApi.getAllLearning().subscribe(data => {
      data.forEach(course => {
        course.topicName = this.helperService.getTopicName(course.topicCode);
        course.publishedOn = course.publishedOn
          ? moment(course.publishedOn, 'DD/MM/YYYY').fromNow()
          : 'NA';
      });
      this.courseList = data;
      this.filteredCourseList = data;
      this.spinner.hide();
    });
  }
  subscribeFilter(): void {
    const sub = this.eventChannel.getChannel().pipe(
        filter(out => out.event === ChannelEvent.ShowHideFilter), takeUntil(this.destroy$))
      .subscribe(() => {
        this.isFilterVisible = !this.isFilterVisible;
      });
    this.subscription.push(sub);
  }

  subscribeSort(): void {
    const sub = this.eventChannel.getChannel().pipe(
        filter(out => out.event === ChannelEvent.ShowHideSort), takeUntil(this.destroy$))
      .subscribe(() => {
        this.isSortVisible = !this.isSortVisible;
      });
    this.subscription.push(sub);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
    if (this.isMobileResolution) {
      this.isFilterVisible = false;
      this.isSortVisible = false;
    }
  }
  
  onCourseClick(course: ICourseDetail) {
    this.router.navigateByUrl('ai-hub/course-detail/' + course.courseId);
  }

  onFilterChange(event, key: string) {
    // console.log('event.checked',event.checked, key, field, this.selectedPayments, this.selectedDeliveryMode);
    this.productFilter();
  }

  productFilter(isSearchCall = false) {
    let tempList = [...this.courseList];
    if (
      this.selectedTopic.length > 0 ||
      this.selectedPayments.length > 0 ||
      this.selectedDeliveryMode.length > 0 ||
      this.selectedSkillstudioCategories.length > 0
    ) {
      if (this.selectedTopic.length) {
        tempList = tempList.filter(course => this.selectedTopic.includes(course.topicCode));
      }
      if (this.selectedPayments.length) {
        tempList = tempList.filter(course => this.selectedPayments.includes(course.prizingModel));
      }
      if (this.selectedDeliveryMode.length > 0) {
        tempList = tempList.filter(course =>
          this.selectedDeliveryMode.includes(course.deliveryMode)
        );
      }
    }
    this.filteredCourseList = tempList;
    if (!isSearchCall) {
      this.onSearch(true);
    }
  }

  onSearch(isFiltered = false): void {
    if (!isFiltered) {
      this.productFilter(true);
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredCourseList = this.filteredCourseList.filter(
        course =>
          this.helperService.getIncludesStr(course.title, this.searchText) ||
          this.helperService.getIncludesStr(course.topicName, this.searchText) ||
          this.helperService.getIncludesStr(course.summary, this.searchText) ||
          this.helperService.getIncludesStr(course.description, this.searchText)
      );
    }
  }
}
