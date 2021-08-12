import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityPageComponent } from './community-page.component';
import { CommunityCarouselComponent } from './components/community-carousel/community-carousel.component';

@NgModule({
  declarations: [CommunityPageComponent, CommunityCarouselComponent],
  imports: [CommonModule, SharedModule, CommunityRoutingModule],
})
export class CommunityModule {}
