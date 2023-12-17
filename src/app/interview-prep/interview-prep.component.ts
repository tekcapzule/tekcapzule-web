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
  learningList: ILearningMaterial[] = [];
  filteredList: ILearningMaterial[] = [];
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = [];
  isMobileResolution: boolean;
  isFilterVisible = true;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];
  selectedDeliveryMode: any[] = [];
  

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

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
    if (this.isMobileResolution) {
      this.isFilterVisible = false;
    }
  }
  
  onFilterUpdate(event) {
    this.selectedTopic = event.topic;
    this.selectedDeliveryMode = event.deliveryMode;
    this.selectedPayments = event.payments;
    this.productFilter();
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
