import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { MarketPlaceComponent } from './market-place.component';
import { MarketPlaceRoutingModule } from './market-place-routing.module';

@NgModule({
  declarations: [MarketPlaceComponent],
  imports: [CommonModule, SharedModule, MatTabsModule, MarketPlaceRoutingModule],
})
export class MarketPlaceModule {}
