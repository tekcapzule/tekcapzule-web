import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, EventChannelService, VideoLibraryApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { TopicItem } from '@app/shared/models';
import { IVideoDetail } from '@app/shared/models/video-library-item.model';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ChannelEvent } from '@app/shared/models/channel-item.model';
import { SkillStudioApiService } from '@app/core/services/skill-studio-api/skill-studio-api.service';
import { ILearningMaterial } from '@app/shared/models/skill-studio-item.model';

@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss'],
})
export class VideoLibraryComponent implements OnInit {
  learningList: ILearningMaterial[] = [];
  filteredList: ILearningMaterial[] = [];
  selectedTopic: string[] = [];
  selectedPayments: any[] = [];
  
  destroy$ = new Subject<boolean>();
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = ['AI', 'WEB3', 'META'];
  isMobileResolution: boolean;
  subscription: Subscription[] = [];
  isFilterVisible = true;

  constructor(
    public spinner: AppSpinnerService,
    private skillApi: SkillStudioApiService,
    private router: Router,
    private helperService: HelperService,
    private messageService: MessageService,
    private eventChannel: EventChannelService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscribeFilter();
    this.topics = this.helperService.getTopicData();
    this.skillApi.getAllLearning().subscribe(data => {
      const items = this.helperService.getLearningMtsByType(data, 'Video');
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

  onVideoClick(video: IVideoDetail) {
    if (this.helperService.isLocalPublisher(video.publisher)) {
      this.spinner.show();
      sessionStorage.setItem('com.tekcapzule.pageURL', this.router.url);
      sessionStorage.setItem('com.tekcapzule.resourceURL', video.resourceUrl);
      sessionStorage.setItem('com.tekcapzule.title', video.title);
      this.router.navigateByUrl('/ai-hub/' + video.videoId + '/detail?pageId=Video_Library');
    } else {
      window.open(video.resourceUrl, '_blank');
    }
  }

  onRecommendClick(eve, video: IVideoDetail) {
    eve.stopPropagation();
    /*this.videoService.updateVideoRecommendCount(video.videoId).subscribe(data => {
      video.isRecommended = true;
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
    return false;*/
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
