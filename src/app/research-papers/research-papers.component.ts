import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, ChannelEvent, EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { ResearchApiService } from '@app/core/services/research-api/research-api.service';
import { TopicItem } from '@app/shared/models';
import { IResearchPaperDetail } from '@app/shared/models/research-item.model';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-research-papers',
  templateUrl: './research-papers.component.html',
  styleUrls: ['./research-papers.component.scss'],
})
export class ResearchPapersComponent implements OnInit {
  researchList: IResearchPaperDetail[] = [];
  filteredResearchList: IResearchPaperDetail[] = [];
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = [];
  isMobileResolution: boolean;
  isFilterVisible = true;
  destroy$ = new Subject<boolean>();
  subscription: Subscription[] = [];

  constructor(
    public spinner: AppSpinnerService,
    private researchApi: ResearchApiService,
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
    this.researchApi.getAllResearchPaper().subscribe(data => {
      this.researchList = data;
      data.forEach(rl => {
        rl.publishedOn = moment(rl.publishedOn, 'DD/MM/YYYY').fromNow();
      });
      this.filteredResearchList = data;
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

  onOpen(research: IResearchPaperDetail) {
    if (this.helperService.isLocalPublisher(research.publisher)) {
      this.spinner.show();
      sessionStorage.setItem('com.tekcapzule.pageURL', this.router.url);
      sessionStorage.setItem('com.tekcapzule.resourceURL', research.resourceUrl);
      sessionStorage.setItem('com.tekcapzule.title', research.title);
      this.router.navigateByUrl(
        '/ai-hub/' + research.researchPaperId + '/detail?pageId=Research_Papers'
      );
    } else {
      window.open(research.resourceUrl, '_blank');
    }
  }

  onRecommendClick(event, research: IResearchPaperDetail) {
    event.stopPropagation();
    this.researchApi.updateResearchRecommendCount(research.researchPaperId).subscribe(data => {
      research.isRecommended = true;
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

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
    if (this.isMobileResolution) {
      this.isFilterVisible = false;
    }
  }
  onSearch() {
    let tempList = [...this.researchList];
    if (this.selectedTopics.length > 0) {
      tempList = tempList.filter(research => this.selectedTopics.includes(research.topicCode));
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredResearchList = tempList.filter(
        research =>
          this.helperService.getIncludesStr(research.title, this.searchText) ||
          this.helperService.getIncludesStr(research.topicCode, this.searchText) ||
          this.helperService.getIncludesStr(research.summary, this.searchText) ||
          this.helperService.getIncludesStr(research.description, this.searchText) ||
          this.helperService.getIncludesStr(research.tags.toString(), this.searchText)
      );
    } else {
      this.filteredResearchList = tempList;
    }
  }

  onChange(eve) {
    this.selectedTopics = [];
    if (eve.value.length > 0) {
      eve.value.forEach((topic: TopicItem) => this.selectedTopics.push(topic.code));
    }
    this.onSearch();
  }

  filterUpdate(topics) {
    this.selectedTopics = topics;
    this.onSearch();
  }
}
