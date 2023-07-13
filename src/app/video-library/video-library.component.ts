import { Component, OnInit } from '@angular/core';

import { AppSpinnerService, VideoLibraryApiService } from '@app/core';
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
    private videoService: VideoLibraryApiService) {}

  ngOnInit(): void {
      this.videoService.getAllVideos().subscribe(data => {
        this.spinner.hide();
        this.videoList = data;
        this.filteredVideoList = data;
      }); 
  }

  onVideoClick(video: IVideoDetail) {
    window.open(video.videoUrl, '_blank');
  }
}
