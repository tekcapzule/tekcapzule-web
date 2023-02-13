import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TekBytePageComponent } from './tek-byte-page.component';
import { MenuLandingPageComponent } from './menu-landing-page/menu-landing-page.component';



@NgModule({
  declarations: [
    TekBytePageComponent,
    MenuLandingPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TekByteModule { }
