import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EventsComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatTabsModule, EventsRoutingModule],
})
export class EventsModule {}
