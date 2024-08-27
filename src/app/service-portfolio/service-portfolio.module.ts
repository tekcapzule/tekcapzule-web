import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { ServicePortfolioRoutingModule } from './service-portfolio-routing.module';
import { ServicePortfolioComponent } from './service-portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ServicePortfolioComponent],
  imports: [CommonModule, SharedModule, ServicePortfolioRoutingModule, ToastModule],
})
export class ServicePortfolioModule { }
