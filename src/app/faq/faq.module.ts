import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqPageComponent } from './faq-page.component';

@NgModule({
  declarations: [FaqPageComponent],
  imports: [CommonModule, FaqRoutingModule],
})
export class FaqModule {}
