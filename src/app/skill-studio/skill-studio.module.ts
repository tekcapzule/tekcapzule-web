import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ToastModule } from 'primeng/toast';
import { SkillStudioRoutingModule } from './skill-studio-routing.module';
import { SkillStudioComponent } from './skill-studio.component';
import { AIDashboardComponent } from './ai-dashboard/ai-dashboard.component';

@NgModule({
  declarations: [SkillStudioComponent, AIDashboardComponent],
  exports: [AIDashboardComponent],
  imports: [CommonModule, SharedModule, SkillStudioRoutingModule, ToastModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillStudioModule { }
