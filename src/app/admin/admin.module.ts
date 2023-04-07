import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '@app/shared';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminCapsulesComponent } from './components/admin-capsules/admin-capsules.component';
import { AdminTekByteComponent } from './components/admin-tekbyte/admin-tekbyte.component';
import { AdminFeedbackComponent } from './components/admin-feedback/admin-feedback.component';
import { AdminCreateCapsuleComponent } from './components/admin-create-capsule/admin-create-capsule.component';
import { AdminCreateTekByteComponent } from './components/admin-create-tekbyte/admin-create-tekbyte.component';
import { AdminCreateQuestionsComponent } from './components/admin-create-questions/admin-create-questions.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminCapsulesComponent,
    AdminTekByteComponent,
    AdminFeedbackComponent,
    AdminCreateCapsuleComponent,
    AdminCreateTekByteComponent,
    AdminCreateQuestionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    SharedModule,
    AdminRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AdminModule {}
