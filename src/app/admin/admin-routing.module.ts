import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from './admin-page.component';
import { AdminCapsulesComponent } from './components/admin-capsules/admin-capsules.component';
import { AdminCreateCapsuleComponent } from './components/admin-create-capsule/admin-create-capsule.component';
import { AdminCreateQuestionsComponent } from './components/admin-create-questions/admin-create-questions.component';
import { AdminCreateTekByteComponent } from './components/admin-create-tekbyte/admin-create-tekbyte.component';
import { AdminFeedbackComponent } from './components/admin-feedback/admin-feedback.component';
import { AdminTekByteComponent } from './components/admin-tekbyte/admin-tekbyte.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'capsules',
        component: AdminCapsulesComponent,
      },
      {
        path: 'tekByte',
        component: AdminTekByteComponent,
      },
      {
        path: 'feedback',
        component: AdminFeedbackComponent,
      },
      {
        path: 'createcapsule',
        component: AdminCreateCapsuleComponent,
      },
      {
        path: 'editcapsule',
        component: AdminCreateCapsuleComponent,
      },
      {
        path: 'createquestions',
        component: AdminCreateQuestionsComponent,
      },
      {
        path: 'createtekbyte',
        component: AdminCreateTekByteComponent,
      },
      {
        path: 'edittekByte/:topicCode',
        component: AdminCreateTekByteComponent,
      },
      {
        path: '',
        redirectTo: 'capsules',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'capsules',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
