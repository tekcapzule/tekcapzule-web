import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { LlmHubComponent } from './llm-hub.component';
import { LlmHubRoutingModule } from './llm-hub-routing.module';

@NgModule({
  declarations: [LlmHubComponent],
  imports: [CommonModule, SharedModule, MatTabsModule, LlmHubRoutingModule],
})
export class LlmHubModule {}
