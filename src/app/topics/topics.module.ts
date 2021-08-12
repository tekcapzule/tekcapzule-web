import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsPageComponent } from './topics-page.component';
import { ExploreTopicsComponent } from './components/explore-topics/explore-topics.component';
import { TopicDetailsComponent } from './components/topic-details/topic-details.component';
import { TopicCarouselComponent } from './components/topic-carousel/topic-carousel.component';

@NgModule({
  declarations: [
    TopicsPageComponent,
    ExploreTopicsComponent,
    TopicDetailsComponent,
    TopicCarouselComponent,
  ],
  imports: [CommonModule, SharedModule, TopicsRoutingModule],
})
export class TopicsModule {}
