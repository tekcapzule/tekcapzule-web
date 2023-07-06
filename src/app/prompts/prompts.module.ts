import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { PromptsComponent } from '../prompts/prompts.component';
import { PromptsRoutingModule } from '../prompts/prompts-routing.module';

@NgModule({
  declarations: [PromptsComponent],
  imports: [CommonModule, SharedModule, MatTabsModule, PromptsRoutingModule],
})
export class PromptsModule {}
