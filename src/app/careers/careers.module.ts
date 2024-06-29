import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { CareersRoutingModule } from './careers-routing.module';
import { CareersComponent } from './careers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [CareersComponent],
  imports: [CommonModule, SharedModule, CareersRoutingModule, FormsModule, ToastModule, ReactiveFormsModule],
})
export class CareersModule { }
