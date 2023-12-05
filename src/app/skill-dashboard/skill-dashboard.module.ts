import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { SkillDashboardComponent } from './skill-dashboard.component';
import { SkillDashboardRoutingModule } from './skill-dashboard-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkillSkeletonComponent } from './skill-skeleton/skill-skeleton.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { SkillCardComponent } from './skill-card/skill-card.component';

@NgModule({
  declarations: [SkillDashboardComponent, SkillCardComponent, SkillSkeletonComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    SkillDashboardRoutingModule,
    CheckboxModule,
    ToastModule,
    AccordionModule
  ],
  providers: [
    MessageService
  ]
})
export class SkillDashboardModule {}
