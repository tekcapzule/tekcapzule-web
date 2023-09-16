import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsightsRoutingModule } from './insights-routing.module';
import { InsightsPageComponent } from './insights-page.component';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    InsightsPageComponent,
    LineChartComponent
  ],
  imports: [CommonModule, FormsModule, InsightsRoutingModule, AccordionModule],
})
export class InsightsModule {}
