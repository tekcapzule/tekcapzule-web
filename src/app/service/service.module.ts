import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ToastModule } from 'primeng/toast';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';

@NgModule({
  declarations: [ServiceComponent],
  imports: [CommonModule, SharedModule, ServiceRoutingModule, ToastModule],
})
export class ServiceModule { }
