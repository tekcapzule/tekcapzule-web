import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from '@app/shared';
import { CapsulesRoutingModule } from './capsules-routing.module';
import { CapsulesPageComponent } from './capsules-page.component';
import { CapsuleFeedsComponent } from './components/capsule-feeds/capsule-feeds.component';
import { CapsuleTrendingComponent } from './components/capsule-trending/capsule-trending.component';
import { EditorsPickComponent } from './components/editors-pick/editors-pick.component';
import { CreateSuccessComponent } from './components/create-success/create-success.component';
import { ContributeCapsuleComponent } from './components/contribute-capsule/contribute-capsule.component';
import { CapsuleDetailsComponent } from './components/capsule-details/capsule-details.component';
import { ToastModule } from 'primeng/toast';
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
  imports: [
    ToastModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    SharedModule,
    CapsulesRoutingModule
  ],
  providers: [
    MessageService
  ]
})
export class CapsulesModule {}
