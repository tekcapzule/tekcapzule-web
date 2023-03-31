import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';

import { SharedModule } from '@app/shared';
import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsPageComponent } from './topics-page.component';
import { ExploreTopicsComponent } from './components/explore-topics/explore-topics.component';
import { TopicDetailsComponent } from './components/topic-details/topic-details.component';

@NgModule({
  declarations: [TopicsPageComponent, ExploreTopicsComponent, TopicDetailsComponent],
  imports: [CommonModule, SharedModule, TopicsRoutingModule, MatTabsModule],
})
export class TopicsModule {}
