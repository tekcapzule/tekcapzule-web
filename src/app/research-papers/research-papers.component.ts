import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { ResearchApiService } from '@app/core/services/research-api/research-api.service';
import { TopicItem } from '@app/shared/models';
import { IResearchPaperDetail } from '@app/shared/models/research-item.model';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ChannelEvent } from '@app/shared/models/channel-item.model';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';

@Component({
  selector: 'app-research-papers',
  templateUrl: './research-papers.component.html',
  styleUrls: ['./research-papers.component.scss'],
})
export class ResearchPapersComponent implements OnInit {
  learningList: ILearningMaterial[] = [];
  filteredList: ILearningMaterial[] = [];
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];

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
    this.getResearchPapers();
  }

  getResearchPapers() {
    this.skillApi.getAllLearning().subscribe(data => {
      const items = this.helperService.getLearningMtsByType(data, 'Research Paper');
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
    this.selectedPayments = event.payments;
    this.productFilter();
  }  
  
  productFilter(isSearchCall = false) {
    this.filteredList = this.helperService.productFilter(this.learningList, this.selectedTopic,
      this.selectedPayments, []);
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
}
