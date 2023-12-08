import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [HomePageComponent, HomeCarouselComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CarouselModule,
    HomeRoutingModule,
    ToastModule,
    NgxTypedWriterModule
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class HomeModule {}
