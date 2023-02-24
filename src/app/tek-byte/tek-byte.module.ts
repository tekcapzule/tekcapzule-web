import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicDetailsPageComponent } from './tek-byte-page.component';
import { TekBytePageComponent } from './tekbyte-page/tekbyte-page.component';



@NgModule({
  declarations: [
    TopicDetailsPageComponent,
    TekBytePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TekByteModule { }
