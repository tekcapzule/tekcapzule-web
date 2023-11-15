import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCardComponent } from './event-card/event-card.component';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [EventsComponent, EventCardComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    EventsRoutingModule,
    CarouselModule
  ],
})
export class EventsModule {}
