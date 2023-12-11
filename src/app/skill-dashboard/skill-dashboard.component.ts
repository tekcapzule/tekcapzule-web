import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppSpinnerService, CourseApiService, EventChannelService, TopicApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { TopicItem } from '@app/shared/models';
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
  learningMtList: ILearningMaterial[] = [];
  filteredlearningMtList: ILearningMaterial[] = [];
  topics: TopicItem[] = [];
  selectedTopic: string[] = [];
  selectedPayments: string[] = [];
  selectedDeliveryMode: string[] = [];
  selectedSkillCategories: string[] = [];
  selectedAllCategory: string[] = [];
  learningMtObj: any = {};
  learningMtGrps: string[] = [];
  navUrl: any = {};
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
  skillCategories: any[] = [
    { name: 'Tekbyte', key: 'Tekbyte', iconClass: 'tekbyte' },
    { name: 'Course', key: 'Course', iconClass: 'course' },
    { name: 'Interview Prep', key: 'Interview Prep', iconClass: 'interview-prep' },
    { name: 'Video', key: 'Video', iconClass: 'video' },
    { name: 'Research Paper', key: 'Research Paper', iconClass: 'research-paper' },
    { name: 'Newsletter', key: 'Newsletter', iconClass: 'newsletter' },
    { name: 'Podcast', key: 'Podcast', iconClass: 'podcast' },
    { name: 'Event', key: 'Events', iconClass: 'events' },
    { name: 'Recorded Event', key: 'Recorded Event', iconClass: 'events' },
    { name: 'Book', key: 'Book', iconClass: 'book' }
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
      this.topics = topics;
    });
    this.getLearningMt();
  }

  getLearningMt() {
    this.skillStudioApi.getAllLearning().subscribe(data => {
      data.forEach(learningMt => {
        learningMt.topicName = this.helperService.getTopicName(learningMt.topicCode);
        learningMt.publishedOn = learningMt.publishedOn
          ? moment(learningMt.publishedOn, 'DD/MM/YYYY').fromNow()
          : 'NA';
      });
      this.learningMtList = data;
      this.filteredlearningMtList = data;
      this.seperateCategory();
      this.spinner.hide();
    });
  }

  seperateCategory() {
    this.learningMtObj = {};
    this.learningMtGrps = [];
    this.navUrl = {};
    this.filteredlearningMtList.forEach(lm => {
      if(this.learningMtObj[lm.learningMaterialType]) {
        this.learningMtObj[lm.learningMaterialType].push(lm);
      } else {
        this.learningMtObj[lm.learningMaterialType] = []
        this.learningMtObj[lm.learningMaterialType].push(lm);
      }
      this.learningMtGrps = Object.keys(this.learningMtObj);
      this.learningMtGrps.forEach(grpName => {
        this.navUrl[grpName] = {};
        this.navUrl[grpName]['len'] = 3;
        if( grpName === 'Tekbyte') {
          this.navUrl[grpName]['url'] = this.helperService.getSkillPage('Tekbyte').navUrl;
        } else if(grpName === 'Course') {
          this.navUrl[grpName]['url'] = this.helperService.getSkillPage('Courses').navUrl;
        } else if(grpName === 'Interview Prep') {
          this.navUrl[grpName]['url'] = this.helperService.getSkillPage('Interview_Prep').navUrl;
        } else if(grpName === 'Video') {
          this.navUrl[grpName]['url'] = this.helperService.getSkillPage('Video_Library').navUrl;
        } else if(grpName === 'Research Paper') {
          this.navUrl[grpName]['url'] = this.helperService.getSkillPage('Research_Papers').navUrl;
        } else if(grpName === 'Newsletter') {
          this.navUrl[grpName]['url'] = this.helperService.getSkillPage('Weekly_Digest').navUrl;
        } else if(grpName === 'Podcast') {
          this.navUrl[grpName]['url'] = this.helperService.getSkillPage('Weekly_Digest').navUrl;
        } else if(grpName === 'Events' || grpName === 'Recorded Event') {
          this.navUrl[grpName]['url'] = '/ai-hub/events';
        } else if(grpName === 'Book') {
          this.navUrl[grpName]['url'] = '/ai-hub/research-papers';
        }
      });
    });
    
  }

  openDashboard(groupName) {
    this.router.navigateByUrl(this.navUrl[groupName].url);
  }
  learnMore(groupName) {
    this.navUrl[groupName]['len'] = 6;
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
  
  onLearningClick(learningMt: ILearningMaterial) {
    this.router.navigateByUrl('ai-hub/course-detail/' + learningMt.learningMaterialId);
  }
  onSelectAll(event) {
    this.selectedSkillCategories = []
    if(event.checked.length) {
      this.skillCategories.forEach(skill => {
        this.selectedSkillCategories.push(skill.key)
      })
    }
  }

  onFilterChange(event, key: string) {
    if(event.checked.length === this.skillCategories.length) {
      this.selectedAllCategory = ['All'];
    }else {
      this.selectedAllCategory = [];
    }
    this.productFilter();
  }

  productFilter(isSearchCall = false) {
    let tempList = [...this.learningMtList];
    if (
      this.selectedTopic.length > 0 ||
      this.selectedPayments.length > 0 ||
      this.selectedSkillCategories.length > 0
    ) {
      if (this.selectedTopic.length) {
        tempList = tempList.filter(learningMt => this.selectedTopic.includes(learningMt.topicCode));
      }
      if (this.selectedPayments.length) {
        tempList = tempList.filter(learningMt => this.selectedPayments.includes(learningMt.prizingModel));
      }
      if (this.selectedSkillCategories.length) {
        tempList = tempList.filter(learningMt => this.selectedSkillCategories.includes(learningMt.learningMaterialType));
      }
    }
    this.filteredlearningMtList = tempList;
    if (!isSearchCall) {
      this.onSearch(true);
      this.seperateCategory();
    }
  }

  onSearch(isFiltered = false): void {
    if (!isFiltered) {
      this.productFilter(true);
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredlearningMtList = this.filteredlearningMtList.filter(
        learningMt =>
          this.helperService.getIncludesStr(learningMt.title, this.searchText) ||
          this.helperService.getIncludesStr(learningMt.topicName, this.searchText) ||
          this.helperService.getIncludesStr(learningMt.summary, this.searchText) ||
          this.helperService.getIncludesStr(learningMt.description, this.searchText)
      );
    }
    
    this.seperateCategory();
  }
}
