import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from '@app/shared';
import { HomeModule } from '@app/home';
import { CapsulesModule } from '@app/capsules';
import { TopicsModule } from '@app/topics';
import { CommunityModule } from '@app/community';
import { AdminModule } from '@app/admin';
import { MissionModule } from '@app/mission';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HomeModule,
    AdminModule,
    CapsulesModule,
    TopicsModule,
    CommunityModule,
    MissionModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
