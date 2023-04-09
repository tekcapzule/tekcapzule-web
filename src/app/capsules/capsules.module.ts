import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { CapsulesRoutingModule } from './capsules-routing.module';
import { CapsulesPageComponent } from './capsules-page.component';
import { CapsuleFeedsComponent } from './components/capsule-feeds/capsule-feeds.component';
import { CapsuleTrendingComponent } from './components/capsule-trending/capsule-trending.component';
import { EditorsPickComponent } from './components/editors-pick/editors-pick.component';
import { CreateSuccessComponent } from './components/create-success/create-success.component';
import { ContributeCapsuleComponent } from './components/contribute-capsule/contribute-capsule.component';
import { CapsuleDetailsComponent } from './components/capsule-details/capsule-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastModule } from 'primeng/toast';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    CapsulesPageComponent,
    CapsuleFeedsComponent,
    CapsuleTrendingComponent,
    EditorsPickComponent,
    CreateSuccessComponent,
    ContributeCapsuleComponent,
    CapsuleDetailsComponent,
  ],
  imports: [ToastModule, CommonModule, FormsModule, MatTabsModule, SharedModule, CapsulesRoutingModule],
  providers: [MessageService]
})
export class CapsulesModule {}
