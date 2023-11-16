import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';

import { SharedModule } from '@app/shared';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FeedsPageComponent } from './feeds-page.component';
import { CapsulesRoutingModule } from './feeds-routing.module';
import { FeedsComponent } from './components/feeds/feeds.component';
import { ContributeFeedComponent } from './components/contribute-feed/contribute-feed.component';
import { CreateSuccessComponent } from './components/create-success/create-success.component';
import { SharePostComponent } from './components/share-post/share-post.component';

@NgModule({
  declarations: [
    FeedsPageComponent,
    FeedsComponent,
    CreateSuccessComponent,
    ContributeFeedComponent,
    SharePostComponent,
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
export class FeedsModule {}
