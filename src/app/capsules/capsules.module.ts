import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from '@app/shared';
import { CapsulesRoutingModule } from './capsules-routing.module';
import { CapsulesPageComponent } from './capsules-page.component';
import { CapsuleFeedsComponent } from './components/capsule-feeds/capsule-feeds.component';
import { CreateCapsuleComponent } from './components/create-capsule/create-capsule.component';
import { CapsuleTrendingComponent } from './components/capsule-trending/capsule-trending.component';
import { EditorsPickComponent } from './components/editors-pick/editors-pick.component';

@NgModule({
  declarations: [
    CapsulesPageComponent,
    CapsuleFeedsComponent,
    CreateCapsuleComponent,
    CapsuleTrendingComponent,
    EditorsPickComponent,
  ],
  imports: [CommonModule, MatTabsModule, SharedModule, CapsulesRoutingModule],
})
export class CapsulesModule {}
