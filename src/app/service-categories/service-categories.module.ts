import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ToastModule } from 'primeng/toast';
import { ServiceCategoriesRoutingModule } from './service-categories-routing.module';
import { ServiceCategoriesComponent } from './service-categories.component';

@NgModule({
  declarations: [ServiceCategoriesComponent],
  imports: [CommonModule, SharedModule, ServiceCategoriesRoutingModule, ToastModule],
})
export class ServiceCategoriesModule { }
