import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { MissionRoutingModule } from './mission-routing.module';
import { MissionPageComponent } from './mission-page.component';


@NgModule({
  declarations: [
    MissionPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MissionRoutingModule
  ]
})
export class MissionModule { }
