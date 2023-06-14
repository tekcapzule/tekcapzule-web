import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { MentoringComponent } from './mentoring.component';
import { MentoringRoutingModule } from './mentoring-routing.module';

@NgModule({
  declarations: [MentoringComponent],
  imports: [CommonModule, SharedModule, MatTabsModule, MentoringRoutingModule],
})
export class MentoringModule {}
