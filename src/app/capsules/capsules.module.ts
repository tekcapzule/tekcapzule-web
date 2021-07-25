import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { CapsulesRoutingModule } from './capsules-routing.module';
import { CapsulesPageComponent } from './capsules-page.component';


@NgModule({
  declarations: [
    CapsulesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CapsulesRoutingModule
  ]
})
export class CapsulesModule { }
