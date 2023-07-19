import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, VideoLibraryApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { IVideoDetail } from '@app/shared/models/video-library-item.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss'],
})
export class VideoLibraryComponent implements OnInit {
  videoList: IVideoDetail[] = [];
  filteredVideoList: IVideoDetail[] = [];
  searchText: string;

  constructor(private spinner: AppSpinnerService, 
    private videoService: VideoLibraryApiService,
    private router: Router,
    private helperService: HelperService,
    private messageService: MessageService) {}

  ngOnInit(): void {
      this.videoService.getAllVideos().subscribe(data => {
        this.spinner.hide();
        this.videoList = data;
        this.filteredVideoList = data;
      }); 
  }

  onVideoClick(video: IVideoDetail) {
    if (this.helperService.isLocalPublisher(video.publisher)) {
      this.spinner.show();
      sessionStorage.setItem('com.tekcapsule.pageURL', this.router.url);
      sessionStorage.setItem('com.tekcapsule.resourceURL', video.resourceUrl);
      sessionStorage.setItem('com.tekcapsule.title', video.title);
      this.router.navigateByUrl('/ai-hub/' + video.videoId +'/detail?pageId=Video_Library');
    } else {
      window.open(video.resourceUrl, '_blank');
    }
  }

  onSearch() {
    if(this.searchText && this.searchText.trim().length > 0) {
      this.filteredVideoList = this.videoList.filter(research => this.helperService.getIncludesStr(research.title, this.searchText) 
      || this.helperService.getIncludesStr(research.topicCode, this.searchText)
      || this.helperService.getIncludesStr(research.summary, this.searchText)
      || this.helperService.getIncludesStr(research.description, this.searchText));
    } else {
      this.filteredVideoList = [...this.videoList];
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
    });
    return false;
  }

}
