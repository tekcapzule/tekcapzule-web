import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResearchPapersComponent } from './research-papers.component';
import { DetailComponent } from '@app/skill-studio/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ResearchPapersComponent,
    children: [
      {
        path: ':id/details',
        component: DetailComponent
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
