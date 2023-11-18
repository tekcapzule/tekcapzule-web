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

@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss'],
})
export class VideoLibraryComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  videoList: IVideoDetail[] = [];
  filteredVideoList: IVideoDetail[] = [];
  searchText: string;
  topics: TopicItem[] = [];
  selectedTopics: string[] = ['AI', 'WEB3', 'META'];
  isMobileResolution: boolean;
  subscription: Subscription[] = [];
  isFilterVisible = true;

  constructor(
    public spinner: AppSpinnerService,
    private videoService: VideoLibraryApiService,
    private router: Router,
    private helperService: HelperService,
    private messageService: MessageService,
    private eventChannel: EventChannelService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscribeFilter();
    this.topics = this.helperService.getTopicData();
    this.videoService.getAllVideos().subscribe(data => {
      this.spinner.hide();
      this.videoList = data;
      this.videoList.forEach(video => {
        const topic = this.topics.find(t => t.code === video.topicCode);
        video.topicName = topic ? topic.title : '';
        video.publishedOn = video.publishedOn
          ? moment(video.publishedOn, 'DD/MM/YYYY').fromNow()
          : 'NA';
      });
      this.filteredVideoList = this.videoList;
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
    this.videoService.updateVideoRecommendCount(video.videoId).subscribe(data => {
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
    return false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileResolution = window.innerWidth < 992 ? true : false;
    this.helperService.setMobileResolution(this.isMobileResolution);
    if (this.isMobileResolution) {
      this.isFilterVisible = false;
    }
  }
  onSearch(): void {
    let tempList = [...this.videoList];
    if (this.selectedTopics.length > 0) {
      tempList = tempList.filter(video => this.selectedTopics.includes(video.topicCode));
    }
    if (this.searchText && this.searchText.trim().length > 0) {
      this.filteredVideoList = tempList.filter(
        video =>
          this.helperService.getIncludesStr(video.title, this.searchText) ||
          this.helperService.getIncludesStr(video.topicName, this.searchText) ||
          this.helperService.getIncludesStr(video.summary, this.searchText) ||
          this.helperService.getIncludesStr(video.description, this.searchText)
      );
    } else {
      this.filteredVideoList = tempList;
    }
  }

  onChange(eve: any): void {
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
}
