import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { MatTabsModule } from '@angular/material/tabs';
import { TekbyteRoutingModule } from './tekbyte-routing.module';
import { TekBytePageComponent } from './tekbyte-page.component';
import { TopicDetailsPageComponent } from './components/topic-details/topic-details.component';
import { TekByteCarouselComponent } from './components/tekbyte-carousel/tekbyte-carousel.component';



@NgModule({
    declarations: [
        TekBytePageComponent,
        TekByteCarouselComponent,
        TopicDetailsPageComponent,
    ],
    imports: [CommonModule, SharedModule, TekbyteRoutingModule, MatTabsModule],

})
export class TekByteModule {}
