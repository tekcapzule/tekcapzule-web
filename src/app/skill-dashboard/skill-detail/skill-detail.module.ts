import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { CheckboxModule } from 'primeng/checkbox';
import { SkillDetailComponent } from './skill-detail.component';
import { SkillDetailRoutingModule } from './skill-detail-routing.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [SkillDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    SkillDetailRoutingModule,
    CheckboxModule,
    CarouselModule
  ],
})
export class CourseDetailModule {}
