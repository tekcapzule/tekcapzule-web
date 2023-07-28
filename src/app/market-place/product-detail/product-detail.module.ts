import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    ProductDetailRoutingModule,
    CheckboxModule,
    CarouselModule
  ],
})
export class ProductDetailModule {}
