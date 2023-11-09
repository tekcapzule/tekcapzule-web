import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, ChannelEvent, EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { InterviewApiService } from '@app/core/services/interview-api/interview-api.service';
import { TopicItem } from '@app/shared/models';
import { IInterviewDetail } from '@app/shared/models/interview-item.model';
import { MessageService } from 'primeng/api';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-interview-prep',
  templateUrl: './interview-prep.component.html',
  styleUrls: ['./interview-prep.component.scss'],
})
export class InterviewPrepComponent implements OnInit {
  interviewList: IInterviewDetail[] = [];
  filteredInterviewList: IInterviewDetail[] = [];
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = [];
  isMobileResolution: boolean;
  isFilterVisible = true;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];

  constructor(
    public spinner: AppSpinnerService,
    private interviewApi: InterviewApiService,
    private helperService: HelperService,
    private router: Router,
    private messageService: MessageService,
    private eventChannel: EventChannelService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.onResize();
    this.subscribeFilter();
    this.topics = this.helperService.getTopicData();
    this.interviewApi.getAllInterview().subscribe(data => {
      this.spinner.hide();
      this.interviewList = data;
      this.filteredInterviewList = data;
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

  
  onOpen(interview: IInterviewDetail) {
    if (this.helperService.isLocalPublisher(interview.publisher)) {
      this.spinner.show();
      sessionStorage.setItem('com.tekcapsule.pageURL', this.router.url);
      sessionStorage.setItem('com.tekcapsule.resourceURL', interview.resourceUrl);
      sessionStorage.setItem('com.tekcapsule.title', interview.title);
      this.router.navigateByUrl(
        '/ai-hub/' + interview.courseId + '/detail?pageId=Interview_Prep'
      );
    } else {
      window.open(interview.resourceUrl, '_blank');
    }
  }

  onRecommendClick(eve, interviewPrep: IInterviewDetail) {
    eve.stopPropagation();
    if(!interviewPrep.isRecommended) {
      this.interviewApi.updateRecommendCount(interviewPrep.courseId).subscribe(data => {
        interviewPrep.isRecommended = true;
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          detail: 'Thank you for the recommendation!',
        });
      }, err => {
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          detail: 'Please try again later!',
        });
      });
    }
    return false;
  }
}
