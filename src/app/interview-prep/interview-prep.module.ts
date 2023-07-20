import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { InterviewPrepComponent } from './interview-prep.component';
import { InterviewPrepRoutingModule } from './interview-prep-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InterviewPrepComponent],
  imports: [CommonModule, FormsModule, SharedModule, MultiSelectModule, MatTabsModule, InterviewPrepRoutingModule],
})
export class InterviewPrepModule {}
