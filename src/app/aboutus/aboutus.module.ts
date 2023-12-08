import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { AboutUsRoutingModule } from './aboutus-routing.module';
import { AboutUsPageComponent } from './aboutus-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AboutUsPageComponent],
  imports: [CommonModule, SharedModule, AboutUsRoutingModule, FormsModule, ToastModule, ReactiveFormsModule],
})
export class AboutUsModule { }
