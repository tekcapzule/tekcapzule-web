import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResearchPapersComponent } from './research-papers.component';
import { CapsuleDetailsComponent } from '@app/capsules/components/capsule-details/capsule-details.component';

const routes: Routes = [
  {
    path: '',
    component: ResearchPapersComponent,
    children: [
      {
        path: ':id/details',
        component: CapsuleDetailsComponent
      },
      {
        path: '',
        redirectTo: 'research-papers',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResearchPapersRoutingModule {}
