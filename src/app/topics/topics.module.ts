import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsPageComponent } from './topics-page.component';

@NgModule({
  declarations: [TopicsPageComponent],
  imports: [CommonModule, SharedModule, TopicsRoutingModule],
})
export class TopicsModule {}
