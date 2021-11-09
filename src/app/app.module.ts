import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@app/shared';
import { AuthModule } from '@app/auth';
import { AdminModule } from '@app/admin';
import { HomeModule } from '@app/home';
import { CapsulesModule } from '@app/capsules';
import { TopicsModule } from '@app/topics';
import { CommunityModule } from '@app/community';
import { MissionModule } from '@app/mission';
import { ApiInterceptor, CacheInterceptor } from '@app/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HomeModule,
    CapsulesModule,
    TopicsModule,
    CommunityModule,
    MissionModule,
    AdminModule,
    AuthModule,
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
