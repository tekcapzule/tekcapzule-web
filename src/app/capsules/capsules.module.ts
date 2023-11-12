import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';

import { SharedModule } from '@app/shared';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CapsulesPageComponent } from './capsules-page.component';
import { CapsulesRoutingModule } from './capsules-routing.module';
import { CapsuleFeedsComponent } from './components/capsule-feeds/capsule-feeds.component';
import { ContributeCapsuleComponent } from './components/contribute-capsule/contribute-capsule.component';
import { CreateSuccessComponent } from './components/create-success/create-success.component';
import { SharePostComponent } from './components/share-post/share-post.component';

@NgModule({
  declarations: [
    CapsulesPageComponent,
    CapsuleFeedsComponent,
    CreateSuccessComponent,
    ContributeCapsuleComponent,
    SharePostComponent
  ],
  imports: [
    ToastModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MultiSelectModule,
    DialogModule,
    SharedModule,
    CapsulesRoutingModule,
  ],
  providers: [MessageService],
})
export class CapsulesModule {}
