import { Component, OnInit } from '@angular/core';

import { AppSpinnerService } from '@app/core';

@Component({
  selector: 'app-video-library',
  templateUrl: './video-library.component.html',
  styleUrls: ['./video-library.component.scss'],
})
export class VideoLibraryComponent implements OnInit {
  constructor(private spinner: AppSpinnerService) {}

  ngOnInit(): void {
  }
}
