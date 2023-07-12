import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { ResearchPapersComponent } from './research-papers.component';
import { ResearchPapersRoutingModule } from './research-papers-routing.module';

@NgModule({
  declarations: [ResearchPapersComponent],
  imports: [CommonModule, SharedModule, MatTabsModule, ResearchPapersRoutingModule],
})
export class ResearchPapersModule {}
