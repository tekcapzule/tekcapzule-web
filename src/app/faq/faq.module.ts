import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { AccordionModule } from 'primeng/accordion';
import { FaqPageComponent } from './faq-page.component';
import { FaqRoutingModule } from './faq-routing.module';

@NgModule({
  declarations: [FaqPageComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    AccordionModule,
    SharedModule
  ]
})
export class FaqModule {}
