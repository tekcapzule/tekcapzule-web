import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { ServiceCategoriesRoutingModule } from './service-categories-routing.module';
import { ServiceCategoriesComponent } from './service-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ServiceCategoriesComponent],
  imports: [CommonModule, SharedModule, ServiceCategoriesRoutingModule, ToastModule],
})
export class ServiceCategoriesModule { }
