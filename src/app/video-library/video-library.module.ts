import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { VideoLibraryComponent } from './video-library.component';
import { VideoLibraryRoutingModule } from './video-library-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VideoLibraryComponent],
  imports: [CommonModule, FormsModule, SharedModule, MatTabsModule, VideoLibraryRoutingModule],
})
export class VideoLibraryModule {}
