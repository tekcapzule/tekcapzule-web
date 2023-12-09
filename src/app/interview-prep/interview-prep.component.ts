import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { AppSpinnerService, EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { InterviewApiService } from '@app/core/services/interview-api/interview-api.service';
import { TopicItem } from '@app/shared/models';
import { IInterviewDetail } from '@app/shared/models/interview-item.model';
import { MessageService } from 'primeng/api';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ChannelEvent } from '@app/shared/models/channel-item.model';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';

@Component({
  selector: 'app-interview-prep',
  templateUrl: './interview-prep.component.html',
  styleUrls: ['./interview-prep.component.scss'],
})
export class InterviewPrepComponent implements OnInit {
  interviewList: ILearningMaterial[] = [];
  filteredInterviewList: ILearningMaterial[] = [];
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = [];
  isMobileResolution: boolean;
  isFilterVisible = true;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];

  constructor(
    public spinner: AppSpinnerService,
    private helperService: HelperService,
    private router: Router,
    private messageService: MessageService,
    private eventChannel: EventChannelService,
    private skillApi: SkillStudioApiService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.onResize();
    this.subscribeFilter();
    this.topics = this.helperService.getTopicData();
    this.getInterviewPrep();
  }

  getInterviewPrep() {
    this.skillApi.getAllLearning().subscribe(data => {
      const items = this.helperService.getLearningMtsByType(data, 'Interview Prep');
      this.interviewList = items.currentList;
      this.filteredInterviewList = items.filteredList;
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

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
    if (this.isMobileResolution) {
      this.isFilterVisible = false;
    }
  }

  onSearch() {
    let tempList = [...this.interviewList];
    if (this.selectedTopics.length > 0) {
      tempList = tempList.filter(tekbyte => this.selectedTopics.includes(tekbyte.topicCode));
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredInterviewList = tempList.filter(
        intreview =>
          this.helperService.getIncludesStr(intreview.title, this.searchText) ||
          this.helperService.getIncludesStr(intreview.topicCode, this.searchText) ||
          this.helperService.getIncludesStr(intreview.summary, this.searchText) ||
          this.helperService.getIncludesStr(intreview.description, this.searchText)
      );
    } else {
      this.filteredInterviewList = tempList;
    }
  }

  onChange(eve) {
    this.selectedTopics = [];
    if (eve.value.length > 0) {
      eve.value.forEach(topic => this.selectedTopics.push(topic.code));
    }
    this.onSearch();
  }

  filterUpdate(topics) {
    this.selectedTopics = topics;
    this.onSearch();
  }


  onOpen(interview: ILearningMaterial) {
    if (this.helperService.isLocalPublisher(interview.publisher)) {
      this.spinner.show();
      sessionStorage.setItem('com.tekcapzule.pageURL', this.router.url);
      sessionStorage.setItem('com.tekcapzule.resourceURL', interview.resourceUrl);
      sessionStorage.setItem('com.tekcapzule.title', interview.title);
      this.router.navigateByUrl(
        '/ai-hub/' + interview.learningMaterialId + '/detail?pageId=Interview_Prep'
      );
    } else {
      window.open(interview.resourceUrl, '_blank');
    }
  }
}
