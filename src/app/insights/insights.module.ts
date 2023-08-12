import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsightsRoutingModule } from './insights-routing.module';
import { InsightsPageComponent } from './insights-page.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [InsightsPageComponent],
  imports: [CommonModule, InsightsRoutingModule, AccordionModule],
})
export class InsightsModule {}
