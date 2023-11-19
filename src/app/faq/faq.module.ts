import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqPageComponent } from './faq-page.component';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FaqPageComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FaqRoutingModule,
    AccordionModule
  ]
})
export class FaqModule {}
