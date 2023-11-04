import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseSkeletonComponent } from './course-skeleton/course-skeleton.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [CoursesComponent, CourseSkeletonComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    CoursesRoutingModule,
    CheckboxModule,
    ToastModule,
    AccordionModule
  ],
  providers: [
    MessageService
  ]
})
export class CoursesModule {}
