import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSpinnerService, VideoLibraryApiService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { IVideoDetail } from '@app/shared/models/video-library-item.model';

@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss'],
})
export class VideoLibraryComponent implements OnInit {
  videoList: IVideoDetail[] = [];
  filteredVideoList: IVideoDetail[] = [];

  constructor(private spinner: AppSpinnerService, 
    private videoService: VideoLibraryApiService,
    private router: Router,
    private helperService: HelperService) {}

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
}
