import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';

import { SharedModule } from '@app/shared';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminCapsulesComponent } from './components/admin-capsules/admin-capsules.component';
import { AdminTekByteComponent } from './components/admin-tekbyte/admin-tekbyte.component';
import { AdminFeedbackComponent } from './components/admin-feedback/admin-feedback.component';
import { AdminCreateCapsuleComponent } from './components/admin-create-capsule/admin-create-capsule.component';
import { AdminCreateTekByteComponent } from './components/admin-create-tekbyte/admin-create-tekbyte.component';
import { AdminCreateQuestionsComponent } from './components/admin-create-questions/admin-create-questions.component';

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
    SharedModule,
    AdminRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AdminModule {}
