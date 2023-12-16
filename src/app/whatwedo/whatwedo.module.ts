import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { WhatwedoRoutingModule } from './whatwedo-routing.module';
import { WhatwedoComponent } from './whatwedo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [WhatwedoComponent],
  imports: [CommonModule, SharedModule, WhatwedoRoutingModule, ToastModule],
})
export class WhatwedoModule { }
