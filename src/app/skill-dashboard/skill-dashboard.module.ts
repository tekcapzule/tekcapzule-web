import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { SkillDashboardComponent } from './skill-dashboard.component';
import { SkillDashboardRoutingModule } from './skill-dashboard-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [SkillDashboardComponent],
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
