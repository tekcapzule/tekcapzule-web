import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { WeeklyDigestComponent } from './weekly-digest.component';
import { WeeklyDigestRoutingModule } from './weekly-digest-routing.module';

@NgModule({
  declarations: [WeeklyDigestComponent],
  imports: [CommonModule, SharedModule, MatTabsModule, WeeklyDigestRoutingModule],
})
export class WeeklyDigestModule {}
