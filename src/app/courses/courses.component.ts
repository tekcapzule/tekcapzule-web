import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, EventChannelService, TopicApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';
import { TopicItem } from '@app/shared/models';
import { ChannelEvent } from '@app/shared/models/channel-item.model';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';
import { shuffleArray } from '@app/shared/utils';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  learningList: ILearningMaterial[] = [];
  filteredList: ILearningMaterial[] = [];
  topics: TopicItem[] = [];
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];
  selectedDeliveryMode: any[] = [];
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
    this.getcourseList()
  }

  getcourseList() {
    this.skillStudioApi.getAllLearning().subscribe(data => {
      const items = this.helperService.getLearningMtsByType(data, 'Course');
      this.learningList = items.currentList;
      this.filteredList = items.filteredList;
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
  
  onCourseClick(learningMt: ILearningMaterial) {
    this.router.navigateByUrl('ai-hub/course-detail/' + learningMt.learningMaterialId + '?pageId="Course"');
  }

  productFilter(isSearchCall = false) {
    this.filteredList = this.helperService.productFilter(this.learningList, this.selectedTopic,
      this.selectedPayments, this.selectedDeliveryMode);
    if (!isSearchCall) {
      this.onSearch(true);
    }
  }

  onSearch(isFiltered = false): void {
    if (!isFiltered) {
      this.productFilter(true);
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.helperService.searchByText(this.filteredList, this.searchText);
    }
  }

  onFilterUpdate(event) {
    this.selectedTopic = event.topic;
    this.selectedDeliveryMode = event.deliveryMode;
    this.selectedPayments = event.payments;
    this.productFilter();
  }
}
