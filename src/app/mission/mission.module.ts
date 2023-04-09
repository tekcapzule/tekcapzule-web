import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { MissionRoutingModule } from './mission-routing.module';
import { MissionPageComponent } from './mission-page.component';
import { CollaborateFormComponent } from './components/collaborate-form/collaborate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [MissionPageComponent, CollaborateFormComponent],
  imports: [CommonModule, SharedModule, MissionRoutingModule, FormsModule, ToastModule, ReactiveFormsModule],
})
export class MissionModule { }
