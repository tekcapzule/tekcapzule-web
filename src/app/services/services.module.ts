import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ServicesComponent],
  imports: [CommonModule, SharedModule, ServicesRoutingModule, ToastModule],
})
export class ServicesModule { }
