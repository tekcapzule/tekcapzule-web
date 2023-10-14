import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InterviewPrepComponent } from './interview-prep.component';
import { CapsuleDetailsComponent } from '@app/capsules/components/capsule-details/capsule-details.component';

const routes: Routes = [
  {
    path: '',
    component: InterviewPrepComponent,
    children: [
      {
        path: ':id/details',
        component: CapsuleDetailsComponent
      },
      {
        path: '',
        redirectTo: 'interview-prepartion',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewPrepRoutingModule {}
