import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { ContactusRoutingModule } from './contactus-routing.module';
import { ContactusComponent } from './contactus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ContactusComponent],
  imports: [CommonModule, SharedModule, ContactusRoutingModule, FormsModule, ToastModule, ReactiveFormsModule],
})
export class ContactusModule { }
