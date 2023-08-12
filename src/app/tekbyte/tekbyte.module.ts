import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { TekbyteRoutingModule } from './tekbyte-routing.module';
import { TekbytePageComponent } from './tekbyte-page.component';
import { ExploreTekbyteComponent } from './components/explore-tekbyte/explore-tekbyte.component';
import { TekbyteDetailsComponent } from './components/tekbyte-details/tekbyte-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TekbyteCardComponent } from './components/tekbyte-card/tekbyte-card.component';
import { CarouselModule } from 'primeng/carousel';
import { TekbyteSkeletonComponent } from './components/tekbyte-skeleton/tekbyte-skeleton.component';

@NgModule({
  declarations: [
    TekbytePageComponent,
    ExploreTekbyteComponent,
    TekbyteDetailsComponent,
    TekbyteCardComponent,
    TekbyteSkeletonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ToastModule,
    TekbyteRoutingModule,
    MatTabsModule,
    CarouselModule,
  ],
  providers: [MessageService],
})
export class TekbyteModule {}
