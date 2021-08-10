import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityPageComponent } from './community-page.component';
import { HeroCarouselComponent } from './components/hero-carousel/hero-carousel.component';

@NgModule({
  declarations: [
    CommunityPageComponent,
    HeroCarouselComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommunityRoutingModule
  ],
})
export class CommunityModule { }
