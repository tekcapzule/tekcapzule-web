import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AIDashboardComponent } from './ai-dashboard/ai-dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { SkillStudioRoutingModule } from './skill-studio-routing.module';
import { SkillStudioComponent } from './skill-studio.component';

@NgModule({
  declarations: [SkillStudioComponent, AIDashboardComponent, DetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    SkillStudioRoutingModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class SkillStudioModule { }
