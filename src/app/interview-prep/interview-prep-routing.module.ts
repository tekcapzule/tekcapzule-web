import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InterviewPrepComponent } from './interview-prep.component';
import { DetailComponent } from '@app/skill-studio/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: InterviewPrepComponent,
    children: [
      {
        path: ':id/details',
        component: DetailComponent
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
