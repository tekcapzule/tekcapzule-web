import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { ProductPortfolioRoutingModule } from './product-portfolio-routing.module';
import { ProductPortfolioComponent } from './product-portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ProductPortfolioComponent],
  imports: [CommonModule, SharedModule, ProductPortfolioRoutingModule, ToastModule],
})
export class ProductPortfolioModule { }
