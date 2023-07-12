import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResearchPapersComponent } from './research-papers.component';

const routes: Routes = [
  {
    path: '',
    component: ResearchPapersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResearchPapersRoutingModule {}
