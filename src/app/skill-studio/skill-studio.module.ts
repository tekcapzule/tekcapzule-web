import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ToastModule } from 'primeng/toast';
import { SkillStudioRoutingModule } from './skill-studio-routing.module';
import { SkillStudioComponent } from './skill-studio.component';

@NgModule({
  declarations: [SkillStudioComponent],
  imports: [CommonModule, SharedModule, SkillStudioRoutingModule, ToastModule],
})
export class SkillStudioModule { }
