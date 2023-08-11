import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { MarketPlaceComponent } from './market-place.component';
import { MarketPlaceRoutingModule } from './market-place-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductSkeletonComponent } from './product-skeleton/product-skeleton.component';

@NgModule({
  declarations: [MarketPlaceComponent, ProductSkeletonComponent],
  imports: [CommonModule, SharedModule, MatTabsModule, MarketPlaceRoutingModule, CheckboxModule],
})
export class MarketPlaceModule {}
