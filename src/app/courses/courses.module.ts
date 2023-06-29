import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, SharedModule, MatTabsModule, CoursesRoutingModule, CheckboxModule],
})
export class CoursesModule {}
