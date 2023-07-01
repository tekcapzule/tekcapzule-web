import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { CheckboxModule } from 'primeng/checkbox';
import { CourseDetailComponent } from './course-detail.component';
import { CourseDetailRoutingModule } from './course-detail-routing.module';

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [CommonModule, SharedModule, MatTabsModule, CourseDetailRoutingModule, CheckboxModule],
})
export class CourseDetailModule {}
