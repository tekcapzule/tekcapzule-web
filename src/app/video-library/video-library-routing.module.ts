import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideoLibraryComponent } from './video-library.component';

const routes: Routes = [
  {
    path: '',
    component: VideoLibraryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoLibraryRoutingModule {}
