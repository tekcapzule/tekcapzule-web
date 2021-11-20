import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';

@NgModule({
  declarations: [HomePageComponent, HomeCarouselComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, SharedModule, HomeRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HomeModule {}
