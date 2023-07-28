import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { CheckboxModule } from 'primeng/checkbox';
import { CourseDetailComponent } from './course-detail.component';
import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    CourseDetailRoutingModule,
    CheckboxModule,
    CarouselModule
  ],
})
export class CourseDetailModule {}
